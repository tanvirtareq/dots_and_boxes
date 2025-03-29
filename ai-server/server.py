import os
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv  # Import dotenv

from model.Line import Line

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

# Define a GameState model (list of LineProps)
class GameState(BaseModel):
    lines: List[Line]

# Define the root route
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/get-move/")
async def get_best_move(state: GameState):
    """
    Receive board state from frontend and return best move.
    """
    bestMove = randomUnclickedLine(state.lines)
    return {"best_move": bestMove}

def randomUnclickedLine(lines: List[Line]):
    unclicked_line = next((line.key for line in lines if not line.isClicked), None)
    return unclicked_line