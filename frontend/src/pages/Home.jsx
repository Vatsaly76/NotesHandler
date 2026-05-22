import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes', err);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      await axios.post('/api/notes', { title, content, tags: tagsArray, isPinned });
      setTitle('');
      setContent('');
      setTags('');
      setIsPinned(false);
      fetchNotes();
    } catch (err) {
      console.error('Error creating note', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Note Creation Form */}
        <div className="md:col-span-1 bg-white p-6 rounded shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Create Note</h3>
          <form onSubmit={handleCreateNote}>
            <input 
              type="text" 
              placeholder="Title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
              required 
            />
            <textarea 
              placeholder="Content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mb-4 border rounded min-h-[100px] focus:outline-none focus:border-blue-500"
              required 
            ></textarea>
            <input 
              type="text" 
              placeholder="Tags (comma separated)" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center mb-4">
              <input 
                type="checkbox" 
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="mr-2"
                id="pinned"
              />
              <label htmlFor="pinned" className="text-sm font-medium text-gray-700">Pin this note</label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium">
              Save Note
            </button>
          </form>
        </div>

        {/* Notes Display */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 bg-white p-8 rounded shadow">
              <p>No notes found. Create some!</p>
            </div>
          ) : (
            notes.map(note => (
              <div key={note._id} className="bg-white p-6 rounded shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold">{note.title}</h4>
                    {note.isPinned && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pinned</span>}
                  </div>
                  <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button onClick={() => handleDeleteNote(note._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;