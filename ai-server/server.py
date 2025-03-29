import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv  # Import dotenv
from typing import List
from model.GameState import GameState
from model.Line import Line
import torch
from model.Dqn import DQN

# Load environment variables from .env file
load_dotenv()

# Create the FastAPI app instance
app = FastAPI()

# Add CORS middleware to allow requests from specified origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS").split(","),
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.post("/get-move/")
async def get_best_move(state: GameState):
    """
    Receive board state from frontend and return best move.
    """
    lines = sorted(state.lines, key=lambda l: l.key)
    modelState = [line.isClicked for line in lines]
    actions = get_sorted_best_actions(modelState)
    bestMove = next((i for i, q_val in actions if modelState[i] == 0), None)
    return {"best_move": lines[bestMove].key}

def randomUnclickedLine(lines: List[Line]):
    unclicked_line = next((line.key for line in lines if not line.isClicked), None)
    return unclicked_line

model = DQN(input_dim=60, output_dim=60)
model.load_state_dict(torch.load("model/dots_and_boxes_dqn_model.pth"))
model.eval()  # Set the model to evaluation mode

def get_sorted_best_actions(state):
    # Convert the state to a tensor
    state_tensor = torch.tensor(state, dtype=torch.float32).unsqueeze(0)  # Add batch dimension
    
    # Pass the state through the DQN model to get Q-values for all actions
    with torch.no_grad():
        q_values = model(state_tensor).squeeze().numpy()  # Get Q-values for each action

    # Create a list of (action, q_value) pairs
    actions_with_scores = [(i, q_value) for i, q_value in enumerate(q_values)]

    # Sort actions based on Q-values in descending order (best actions first)
    sorted_actions = sorted(actions_with_scores, key=lambda x: x[1], reverse=True)

    return sorted_actions
