import { useState, useEffect } from 'react'

function NoteForm({ onAdd, onUpdate, editingNote, onCancel }) {
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    if (editingNote) {
      setContent(editingNote.content)
      setTags(editingNote.tags.join(', '))
    } else {
      setContent('')
      setTags('')
    }
  }, [editingNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return

    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag)

    if (editingNote) {
      onUpdate(editingNote.id, {
        content,
        tags: tagList
      })
    } else {
      onAdd({
        content,
        tags: tagList
      })
    }

    if (!editingNote) {
      setContent('')
      setTags('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">What did you learn?</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
          placeholder="Today I learned about..."
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
          placeholder="react, fastapi, mongodb"
        />
      </div>

      <div className="flex justify-end gap-3">
        {editingNote && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-white font-medium py-2 px-4 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all transform hover:scale-105"
        >
          {editingNote ? 'Update Note' : 'Add Entry'}
        </button>
      </div>
    </form>
  )
}

export default NoteForm
