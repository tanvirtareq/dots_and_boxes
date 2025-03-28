from typing import Union, Literal

from .Player import Player

# Define the Winner type
Winner = Union[Player, Literal["tie"], None]
