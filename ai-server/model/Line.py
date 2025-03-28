from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from .Point import Point
from .Orientation import Orientation
from .Player import Player

# Define the Line model
class Line(BaseModel):
    key: str  # Format: 'h-x-y' or 'v-x-y', where 'h' and 'v' denote horizontal and vertical lines respectively, and 'x' and 'y' represent the coordinates.
    p1: Point
    p2: Point
    orientation: Orientation 
    isClicked: Optional[bool] = False
    clickedBy: Optional[Player] = None  # The user who clicked the line, if applicable
    clicked_at: Optional[datetime] = None  # None indicates the line has not been clicked