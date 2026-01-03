import os
import motor.motor_asyncio
from dotenv import load_dotenv

load_dotenv()

# Use localhost if no ENV variable is set (for local dev)
MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.devjot
note_collection = database.get_collection("notes_collection")

# Helper to format Mongo docs
def note_helper(note) -> dict:
    return {
        "id": str(note["_id"]),
        "content": note["content"],
        "tags": note.get("tags", []),
        "created_at": note.get("created_at"),
    }
