# DevJot - Developer Journal

A full-stack application built with React, FastAPI, and MongoDB.

## Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- MongoDB Atlas Account (or local MongoDB)

## Setup & Run

### 1. Database
Create a `.env` file in the `server` folder:
```env
MONGO_DETAILS=mongodb+srv://<username>:<password>@cluster.mongodb.net/devjot
```
*(If using local MongoDB, it defaults to localhost)*

### 2. Frontend (Client)
Open a terminal in `client/`:
```bash
npm install
npm run dev
```

### 3. Backend (Server)
Open a new terminal in `server/`:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
# Option 1: Using FastAPI CLI
fastapi dev main.py
# Option 2: Using Python directly (Try this if the above fails)
python -m uvicorn main:app --reload
```

## Features
- Create daily logs
- Tagging system
- Dark mode UI
"# Devjot" 
