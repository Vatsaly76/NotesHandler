import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesAPI } from '../services/api';

const ACCENT = [
  { card: 'from-violet-500/15 to-violet-800/10 border-violet-500/25', dot: 'bg-violet-400' },
  { card: 'from-cyan-500/15   to-cyan-800/10   border-cyan-500/25',   dot: 'bg-cyan-400'   },
  { card: 'from-pink-500/15   to-pink-800/10   border-pink-500/25',   dot: 'bg-pink-400'   },
  { card: 'from-emerald-500/15 to-emerald-800/10 border-emerald-500/25', dot: 'bg-emerald-400'},
  { card: 'from-amber-500/15  to-amber-800/10  border-amber-500/25',  dot: 'bg-amber-400'  },
];

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function NoteCard({ note, index, onDeleted, onPinToggled }) {
  const { card, dot } = ACCENT[index % ACCENT.length];
  const [deleting, setDeleting] = useState(false);
  const [pinning,  setPinning]  = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this note?')) return;
    setDeleting(true);
    try {
      await notesAPI.remove(note._id);
      onDeleted(note._id);
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  const handlePin = async (e) => {
    e.stopPropagation();
    setPinning(true);
    try {
      const res = await notesAPI.update(note._id, { ...note, isPinned: !note.isPinned });
      onPinToggled(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPinning(false);
    }
  };

  const handleEdit = () => navigate(`/notes/${note._id}/edit`);

  return (
    <article
      onClick={handleEdit}
      className={`relative flex flex-col gap-3 p-5 rounded-2xl cursor-pointer
                  bg-gradient-to-br ${card} border backdrop-blur-sm
                  hover:shadow-card-hover hover:-translate-y-0.5
                  transition-all duration-200 animate-slide-up group`}
      id={`note-card-${note._id}`}
    >
      {/* Accent dot */}
      <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${dot} opacity-60`} />

      {/* Header */}
      <div className="pr-5">
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className="font-display font-semibold text-base text-white leading-snug flex-1 min-w-0 truncate">
            {note.title}
          </h3>
          {note.isPinned && (
            <span className="badge-pinned shrink-0">
              📌 Pinned
            </span>
          )}
        </div>
        {note.createdAt && (
          <time className="text-[11px] text-slate-500 mt-0.5 block">{fmt(note.createdAt)}</time>
        )}
      </div>

      {/* Content preview */}
      <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 flex-1 whitespace-pre-wrap">
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

      {/* Category */}
      {note.category && (
        <span className="inline-flex items-center text-xs text-slate-500 font-medium">
          📁 {note.category}
        </span>
      )}

      {/* Actions — visible on hover */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-auto
                      opacity-0 group-hover:opacity-100 transition-opacity duration-150"
           onClick={e => e.stopPropagation()}>

        {/* Edit */}
        <button
          onClick={handleEdit}
          className="btn-ghost py-1 px-2.5 text-xs"
          id={`edit-note-${note._id}`}
        >
          ✏️ Edit
        </button>

        {/* Pin */}
        <button
          onClick={handlePin}
          disabled={pinning}
          className={`inline-flex items-center gap-1 text-xs font-medium transition-colors
                      ${note.isPinned ? 'text-amber-400 hover:text-amber-300' : 'text-slate-500 hover:text-slate-300'}`}
          id={`pin-note-${note._id}`}
        >
          {pinning
            ? <span className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin"/>
            : (note.isPinned ? '📌 Unpin' : '📍 Pin')}
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn-danger"
          id={`delete-note-${note._id}`}
        >
          {deleting
            ? <span className="w-3 h-3 rounded-full border border-red-400 border-t-transparent animate-spin"/>
            : '🗑️ Delete'}
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
