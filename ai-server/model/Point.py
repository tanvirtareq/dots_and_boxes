from pydantic import BaseModel

class Point(BaseModel):
    key: str  # 'x-y' format
    x: int
    y: int
