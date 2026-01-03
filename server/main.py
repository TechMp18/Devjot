from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from database import note_collection, note_helper
from models import NoteSchema, UpdateNoteModel, ResponseModel, ErrorResponseModel
from bson import ObjectId

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to DevJot API"}

@app.get("/notes")
async def get_notes():
    notes = []
    async for note in note_collection.find():
        notes.append(note_helper(note))
    return ResponseModel(notes, "Notes retrieved successfully")

@app.post("/notes")
async def create_note(note: NoteSchema = Body(...)):
    note_dict = note.dict()
    new_note = await note_collection.insert_one(note_dict)
    created_note = await note_collection.find_one({"_id": new_note.inserted_id})
    return ResponseModel(note_helper(created_note), "Note added successfully")

@app.put("/notes/{id}")
async def update_note(id: str, req: UpdateNoteModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    
    if len(req) >= 1:
        update_result = await note_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": req}
        )
        if update_result.modified_count == 1:
            updated_note = await note_collection.find_one({"_id": ObjectId(id)})
            return ResponseModel(note_helper(updated_note), "Note updated successfully")
            
    existing_note = await note_collection.find_one({"_id": ObjectId(id)})
    if existing_note:
        return ResponseModel(note_helper(existing_note), "Note updated successfully")
        
    return ErrorResponseModel("An error occurred", 404, "Note not found")

@app.delete("/notes/{id}")
async def delete_note(id: str):
    note = await note_collection.find_one({"_id": ObjectId(id)})
    if note:
        await note_collection.delete_one({"_id": ObjectId(id)})
        return ResponseModel("Note deleted", "Note deleted successfully")
    return ErrorResponseModel("An error occurred", 404, "Note not found")

