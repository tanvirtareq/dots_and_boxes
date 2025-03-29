import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import List
from pydantic import BaseModel

from model.Line import Line
from model.GameState import GameState
from model.Point import Point
from model.Orientation import Orientation

class DotsAndBoxesNN(nn.Module):
    def __init__(self, input_size=60*4, hidden_size=128, output_size=60):
        super(DotsAndBoxesNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)  # Output layer (raw scores for moves)
        return x  # No activation, since RL algorithms like softmax/select will be used outside
    

def encode_game_state(game_state: GameState) -> torch.Tensor:
    """
    Convert GameState into a tensor representation.
    Each line's features are encoded into a numerical vector.
    """
    features = []
    for line in game_state.lines:
        # Whether the line is clicked (binary: 0 or 1)
        features.append(1 if line.isClicked else 0)
        
        # Encode the orientation (HORIZONTAL = 1, VERTICAL = 0)
        features.append(1 if line.orientation == Orientation.HORIZONTAL else 0)

        # Encode the key (split 'h-x-y' or 'v-x-y' to extract x and y)
        key_parts = line.key.split("-")
        x, y = int(key_parts[1]), int(key_parts[2])
        features.append(x)  # Use x coordinate as a feature
        features.append(y)  # Use y coordinate as a feature

    # Convert the list of features into a tensor
    return torch.tensor(features, dtype=torch.float32).unsqueeze(0)  # Shape: (1, 60)


# Example usage
if __name__ == "__main__":
    model = DotsAndBoxesNN()
    
    # Example GameState (dummy initialization)
    dummy_lines = [
        Line(
            key=f"h-{i}-0", 
            p1=Point(key=f"{i}-0", x=i, y=0), 
            p2=Point(key=f"{i}-1", x=i, y=1), 
            orientation=Orientation.HORIZONTAL,  # Use the Enum instead of a string
            isClicked=False
        ) 
        for i in range(60)
    ]
    game_state = GameState(lines=dummy_lines)
    
    input_tensor = encode_game_state(game_state)
    output = model(input_tensor)
    
    print(output)  # Predicted scores for each move
