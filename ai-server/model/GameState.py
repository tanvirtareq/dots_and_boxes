from typing import List
from pydantic import BaseModel

from .Line import Line

class GameState(BaseModel):
    lines: List[Line]