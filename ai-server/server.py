import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from model.GameState import GameState
import torch
from model.Dqn import DQN

load_dotenv()

app = FastAPI()

# Add CORS middleware to allow requests from specified origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS").split(","),
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

model = DQN(input_dim=60, output_dim=60)
model.load_state_dict(torch.load("model/dots_and_boxes_dqn_model_final.pth"))
model.eval()

@app.post("/get-move/")
async def get_best_move(state: GameState):
    lines = sorted(state.lines, key=lambda l: l.key)
    modelState = [line.isClicked for line in lines]
    actions = get_sorted_best_actions(modelState)
    bestMove = next((i for i, q_val in actions if modelState[i] == 0), None)
    if bestMove is not None:
        return {"best_move": lines[bestMove].key}
    else:
        return {"best_move": None}

def get_sorted_best_actions(state):
    state_tensor = torch.tensor(state, dtype=torch.float32).unsqueeze(0)
    
    with torch.no_grad():
        output = model(state_tensor).squeeze()
        if not isinstance(output, torch.Tensor):
            raise ValueError("Model output is not a torch.Tensor")
        try:
            q_values = output.numpy()
        except Exception as e:
            raise ValueError(f"Failed to convert model output to NumPy array: {e}")
        
    actions_with_scores = [(i, q_value) for i, q_value in enumerate(q_values)]

    sorted_actions = sorted(actions_with_scores, key=lambda x: x[1], reverse=True)

    return sorted_actions