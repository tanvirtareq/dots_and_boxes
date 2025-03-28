from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from model.Line import Line

# Create the FastAPI app instance
app = FastAPI()

# Add CORS middleware to allow requests from localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows only your frontend
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
    print("Hello, World!")
    return {"message": "Hello, World!"}

@app.post("/get-move/")
async def get_best_move(state: GameState):
    """
    Receive board state from frontend and return best move.
    """
    bestMove = randomUnclickedLine(state.lines)
    return {"best_move": bestMove}

def randomUnclickedLine(lines: List[Line]):
    for line in lines:
        if not line.isClicked:
            return line.key

    return None