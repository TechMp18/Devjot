from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class NoteSchema(BaseModel):
    content: str = Field(..., min_length=1, max_length=500)
    tags: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        schema_extra = {
            "example": {
                "content": "Learned about FastAPI and MongoDB today.",
                "tags": ["fastapi", "python", "mongodb"]
            }
        }

class UpdateNoteModel(BaseModel):
    content: Optional[str]
    tags: Optional[List[str]]

    class Config:
        schema_extra = {
            "example": {
                "content": "Updated content here."
            }
        }

def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
