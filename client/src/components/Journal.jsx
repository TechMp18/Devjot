import { useState, useEffect } from 'react'
import axios from 'axios'
import NoteForm from './NoteForm'
import NoteList from './NoteList'

const API_URL = 'http://localhost:8000/notes'

function Journal() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editingNote, setEditingNote] = useState(null)

    const fetchNotes = async () => {
        try {
            const response = await axios.get(API_URL)
            // Standardize response: check if it's wrapped in data object
            const data = response.data.data ? response.data.data : response.data
            setNotes(data)
            setLoading(false)
        } catch (err) {
            console.error("Error fetching notes:", err)
            setError("Failed to load notes. Is the backend running?")
            setLoading(false)
        }
    }

    const addNote = async (note) => {
        try {
            await axios.post(API_URL, note)
            fetchNotes() // Refresh list
        } catch (err) {
            console.error("Error adding note:", err)
            alert("Failed to add note")
        }
    }

    const updateNote = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/${id}`, updatedData)
            fetchNotes()
            setEditingNote(null) // Clear edit mode
        } catch (err) {
            console.error("Error updating note:", err)
            alert("Failed to update note")
        }
    }

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`)
            fetchNotes() // Refresh list
        } catch (err) {
            console.error("Error deleting note:", err)
            alert("Failed to delete note")
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">
                    {editingNote ? 'Edit Entry' : 'New Entry'}
                </h2>
                <NoteForm
                    onAdd={addNote}
                    onUpdate={updateNote}
                    editingNote={editingNote}
                    onCancel={() => setEditingNote(null)}
                />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-purple-400">Recent Logs</h2>
                    <button
                        onClick={fetchNotes}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading notes...</p>
                ) : error ? (
                    <div className="p-4 bg-red-900/30 border border-red-800 rounded text-red-200 text-center">
                        {error}
                    </div>
                ) : (
                    <NoteList
                        notes={notes}
                        onDelete={deleteNote}
                        onEdit={setEditingNote}
                    />
                )}
            </div>
        </div>
    )
}

export default Journal
