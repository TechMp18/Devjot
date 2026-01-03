function NoteList({ notes, onDelete, onEdit }) {
    if (notes.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-900/50 rounded border border-gray-800 border-dashed">
                <p className="text-gray-500">No entries yet. Start writing!</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {notes.map((note) => (
                <div
                    key={note.id || Math.random()}
                    className="bg-gray-900 p-4 rounded border border-gray-700 hover:border-gray-500 transition-all group"
                >
                    <div className="flex justify-between items-start">
                        <p className="text-gray-200 whitespace-pre-wrap">{note.content}</p>
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <button
                                onClick={() => onEdit(note)}
                                className="text-gray-600 hover:text-blue-400 mr-2"
                                title="Edit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => onDelete(note.id)}
                                className="text-gray-600 hover:text-red-400"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {note.tags && note.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-gray-800 text-blue-300 rounded-full border border-gray-700"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NoteList
