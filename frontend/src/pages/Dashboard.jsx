import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { notesAPI } from '../services/api';
import NoteCard   from '../components/NoteCard';
import SearchBar  from '../components/SearchBar';
import Sidebar    from '../components/Sidebar';

function Dashboard() {
  const [notes,      setNotes]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [activeTag,  setActiveTag]  = useState(null);
  const [searchParams]              = useSearchParams();
  const filterParam                 = searchParams.get('filter'); // 'pinned' | null

  /* ── Fetch notes (called with optional search query) ── */
  const fetchNotes = useCallback(async (search = '') => {
    setError('');
    try {
      const res = await notesAPI.getAll(search);
      setNotes(res.data);
    } catch (err) {
      setError('Failed to load notes. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  /* ── Handlers passed down to NoteCard ── */
  const handleDeleted    = (id)   => setNotes(prev => prev.filter(n => n._id !== id));
  const handlePinToggled = (updated) =>
    setNotes(prev => prev.map(n => (n._id === updated._id ? updated : n)));

  /* ── Derived data ── */
  const allTags = [...new Set(notes.flatMap(n => n.tags ?? []))];

  let displayed = notes;
  if (filterParam === 'pinned') displayed = displayed.filter(n => n.isPinned);
  if (activeTag)                displayed = displayed.filter(n => n.tags?.includes(activeTag));

  // Sort: pinned first, newest first
  displayed = [...displayed].sort((a, b) =>
    (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) || new Date(b.createdAt) - new Date(a.createdAt)
  );

  const pinnedCount = notes.filter(n => n.isPinned).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">

        {/* ── Sidebar ── */}
        <Sidebar
          noteCount={notes.length}
          pinnedCount={pinnedCount}
          tags={allTags}
          activeTag={activeTag}
          onTagClick={setActiveTag}
        />

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="section-title">
                {filterParam === 'pinned' ? '📌 Pinned Notes' : 'My Dashboard'}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {loading ? 'Loading…'
                  : `${displayed.length} note${displayed.length !== 1 ? 's' : ''}${activeTag ? ` tagged #${activeTag}` : ''}`}
              </p>
            </div>
            <Link to="/notes/new" id="dashboard-new-note-btn" className="btn-primary self-start sm:self-auto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                   strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Note
            </Link>
          </div>

          {/* Search bar — fires backend ?search= */}
          <SearchBar onSearch={fetchNotes} placeholder="Search notes by title, content, or tag…" />

          {/* Error banner */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30
                            text-red-400 text-sm" id="dashboard-error">
              ⚠️ {error}
            </div>
          )}

          {/* Loading spinner */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"/>
            </div>

          /* Empty state */
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in
                            glass rounded-2xl" id="dashboard-empty">
              <span className="text-5xl">📝</span>
              <div className="text-center">
                <p className="text-white font-semibold text-lg">
                  {notes.length === 0 ? 'No notes yet' : 'No results found'}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  {notes.length === 0
                    ? 'Click "New Note" to capture your first idea'
                    : 'Try a different search or tag'}
                </p>
              </div>
              {notes.length === 0 && (
                <Link to="/notes/new" className="btn-primary mt-2" id="empty-new-note-btn">
                  Create First Note
                </Link>
              )}
            </div>

          /* Notes grid */
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" id="notes-grid">
              {displayed.map((note, i) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  index={i}
                  onDeleted={handleDeleted}
                  onPinToggled={handlePinToggled}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
