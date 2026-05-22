import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/* ── Icons ──────────────────────────────────────────────── */
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);
const PinIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
       stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4z"/>
  </svg>
);

/* ── Helpers ─────────────────────────────────────────────── */
const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/* Colour rotation for note accents */
const ACCENT_COLORS = [
  'from-violet-500/20 to-violet-700/10 border-violet-500/25',
  'from-cyan-500/15 to-cyan-700/10 border-cyan-500/25',
  'from-pink-500/15 to-pink-700/10 border-pink-500/25',
  'from-emerald-500/15 to-emerald-700/10 border-emerald-500/25',
  'from-amber-500/15 to-amber-700/10 border-amber-500/25',
];
const dotColor = [
  'bg-violet-400', 'bg-cyan-400', 'bg-pink-400', 'bg-emerald-400', 'bg-amber-400',
];

/* ── NoteCard ────────────────────────────────────────────── */
function NoteCard({ note, index, onDelete, onPin }) {
  const accent  = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const dot     = dotColor[index % dotColor.length];
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(note._id);
  };

  return (
    <article
      className={`relative flex flex-col gap-3 p-5 rounded-2xl
                  bg-gradient-to-br ${accent} border backdrop-blur-sm
                  hover:shadow-card-hover hover:-translate-y-0.5
                  transition-all duration-200 animate-slide-up`}
    >
      {/* Top dot accent */}
      <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${dot} opacity-70`} />

      {/* Header */}
      <div className="flex items-start gap-2 pr-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-base text-white truncate leading-snug">
            {note.title}
          </h3>
          {note.createdAt && (
            <time className="text-[11px] text-slate-500 mt-0.5 block">{fmt(note.createdAt)}</time>
          )}
        </div>
        {note.isPinned && (
          <span className="badge-pinned shrink-0">
            <PinIcon filled /> Pinned
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-sm text-slate-300 leading-relaxed line-clamp-4 whitespace-pre-wrap flex-1">
        {note.content}
      </p>

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {note.tags.map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10 mt-auto">
        <button
          onClick={() => onPin(note._id, !note.isPinned)}
          className={`inline-flex items-center gap-1 text-xs font-medium transition-colors duration-150
                      ${note.isPinned
                        ? 'text-amber-400 hover:text-amber-300'
                        : 'text-slate-500 hover:text-slate-300'}`}
          title={note.isPinned ? 'Unpin' : 'Pin'}
          id={`pin-btn-${note._id}`}
        >
          <PinIcon filled={note.isPinned} />
          {note.isPinned ? 'Unpin' : 'Pin'}
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn-danger"
          id={`delete-btn-${note._id}`}
        >
          {deleting
            ? <span className="w-3 h-3 rounded-full border border-red-400 border-t-transparent animate-spin" />
            : <TrashIcon />}
          Delete
        </button>
      </div>
    </article>
  );
}

/* ── Home ─────────────────────────────────────────────────── */
function Home() {
  const [notes,     setNotes]     = useState([]);
  const [title,     setTitle]     = useState('');
  const [content,   setContent]   = useState('');
  const [tags,      setTags]      = useState('');
  const [isPinned,  setIsPinned]  = useState(false);
  const [search,    setSearch]    = useState('');
  const [loading,   setLoading]   = useState(true);
  const [creating,  setCreating]  = useState(false);
  const [formOpen,  setFormOpen]  = useState(false);
  const titleRef = useRef(null);

  useEffect(() => { fetchNotes(); }, []);
  useEffect(() => { if (formOpen) titleRef.current?.focus(); }, [formOpen]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setCreating(true);
    try {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      await axios.post('/api/notes', { title, content, tags: tagsArray, isPinned });
      setTitle(''); setContent(''); setTags(''); setIsPinned(false);
      setFormOpen(false);
      await fetchNotes();
    } catch (err) {
      console.error('Error creating note', err);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try { await axios.delete(`/api/notes/${id}`); await fetchNotes(); }
    catch (err) { console.error('Error deleting note', err); }
  };

  const handlePinNote = async (id, pinned) => {
    try { await axios.patch(`/api/notes/${id}`, { isPinned: pinned }); await fetchNotes(); }
    catch (err) { console.error('Error updating note', err); }
  };

  /* Filtering + sort: pinned first */
  const filtered = notes
    .filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ── Page header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">My Notes</h1>
          <p className="text-slate-400 text-sm mt-1">
            {notes.length === 0 ? 'Start capturing your ideas' : `${notes.length} note${notes.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          id="new-note-btn"
          onClick={() => setFormOpen(v => !v)}
          className="btn-primary self-start sm:self-auto"
        >
          <PlusIcon />
          New Note
        </button>
      </div>

      {/* ── Create form (collapsible) ─── */}
      {formOpen && (
        <div className="glass p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-white flex items-center gap-2">
              <EditIcon /> Create Note
            </h2>
            <button onClick={() => setFormOpen(false)} className="btn-ghost p-1.5" id="close-form-btn">
              <CloseIcon />
            </button>
          </div>

          <form onSubmit={handleCreateNote} className="space-y-4" id="create-note-form">
            <div>
              <label className="label" htmlFor="note-title">Title</label>
              <input
                id="note-title"
                ref={titleRef}
                type="text"
                placeholder="Give your note a name…"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="note-content">Content</label>
              <textarea
                id="note-content"
                placeholder="Write anything…"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="input resize-none min-h-[120px]"
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="note-tags">Tags</label>
              <input
                id="note-tags"
                type="text"
                placeholder="react, ideas, todo  (comma-separated)"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="input"
              />
            </div>

            {/* Pin toggle */}
            <label className="flex items-center gap-3 cursor-pointer group w-fit" id="note-pin-label">
              <div
                onClick={() => setIsPinned(v => !v)}
                className={`relative w-10 h-5.5 rounded-full border transition-all duration-200
                            ${isPinned
                              ? 'bg-violet-600 border-violet-500'
                              : 'bg-white/5 border-white/15'}
                            cursor-pointer`}
                role="switch"
                aria-checked={isPinned}
                id="note-pin-toggle"
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow
                                  transition-transform duration-200
                                  ${isPinned ? 'translate-x-4.5' : 'translate-x-0'}`} />
              </div>
              <span className="text-sm text-slate-300 font-medium">
                <PinIcon filled={isPinned} />
              </span>
              <span className="text-sm text-slate-400">Pin this note</span>
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setFormOpen(false)} className="btn-ghost" id="cancel-note-btn">
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="btn-primary"
                id="save-note-btn"
              >
                {creating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Saving…
                  </span>
                ) : (
                  <><PlusIcon /> Save Note</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Search bar ─── */}
      {notes.length > 0 && (
        <div className="relative max-w-sm" id="search-container">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2"><SearchIcon /></span>
          <input
            id="search-notes-input"
            type="text"
            placeholder="Search notes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-10 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              id="clear-search-btn"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      )}

      {/* ── Notes grid ─── */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10
                          flex items-center justify-center text-slate-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                 className="w-10 h-10">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white font-semibold">
              {search ? 'No results found' : 'No notes yet'}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              {search
                ? `Nothing matches "${search}"`
                : 'Click "New Note" to capture your first idea'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="notes-grid">
          {filtered.map((note, i) => (
            <NoteCard
              key={note._id}
              note={note}
              index={i}
              onDelete={handleDeleteNote}
              onPin={handlePinNote}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;