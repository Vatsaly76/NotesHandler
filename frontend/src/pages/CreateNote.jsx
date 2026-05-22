import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notesAPI } from '../services/api';

const CATEGORIES = ['General', 'Work', 'Personal', 'Ideas', 'Study', 'Todo'];

function CreateNote() {
  const { id }    = useParams();           // present → edit mode
  const isEdit    = Boolean(id);
  const navigate  = useNavigate();

  const [title,    setTitle]    = useState('');
  const [content,  setContent]  = useState('');
  const [tags,     setTags]     = useState('');
  const [category, setCategory] = useState('General');
  const [isPinned, setIsPinned] = useState(false);
  const [loading,  setLoading]  = useState(isEdit);  // start loading only in edit mode
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');

  /* ── Pre-fill form when editing ── */
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const res = await notesAPI.getOne(id);
        const n   = res.data;
        setTitle(n.title ?? '');
        setContent(n.content ?? '');
        setTags((n.tags ?? []).join(', '));
        setCategory(n.category ?? 'General');
        setIsPinned(n.isPinned ?? false);
      } catch (err) {
        setError('Could not load note. It may have been deleted.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    const payload = {
      title:    title.trim(),
      content:  content.trim(),
      tags:     tags.split(',').map(t => t.trim()).filter(Boolean),
      category: category.trim(),
      isPinned,
    };
    try {
      if (isEdit) {
        await notesAPI.update(id, payload);
      } else {
        await notesAPI.create(payload);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-4rem)]">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"/>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <button onClick={() => navigate(-1)}
                className="text-slate-500 hover:text-slate-300 text-sm flex items-center gap-1.5 mb-4 transition-colors"
                id="create-back-btn">
          ← Back
        </button>
        <h1 className="section-title">{isEdit ? '✏️ Edit Note' : '📝 New Note'}</h1>
        <p className="text-slate-400 text-sm mt-1">
          {isEdit ? 'Update your note below.' : 'Capture your idea — every detail matters.'}
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30
                        text-red-400 text-sm animate-slide-up" id="create-note-error">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 space-y-6" id="create-note-form">

        {/* Title */}
        <div>
          <label className="label" htmlFor="note-title">Title *</label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Give your note a memorable title…"
            className="input text-base"
            required
            autoFocus
          />
        </div>

        {/* Content */}
        <div>
          <label className="label" htmlFor="note-content">Content *</label>
          <textarea
            id="note-content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write anything — thoughts, ideas, steps, links…"
            className="input resize-none min-h-[200px] leading-relaxed"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="label" htmlFor="note-tags">Tags</label>
          <input
            id="note-tags"
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="react, ideas, todo  (comma-separated)"
            className="input"
          />
          {tags && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                <span key={i} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label" htmlFor="note-category">Category</label>
          <select
            id="note-category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input cursor-pointer"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Pin toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-slate-200">Pin this note</p>
            <p className="text-xs text-slate-500">Pinned notes appear at the top of your dashboard</p>
          </div>
          <button
            type="button"
            onClick={() => setIsPinned(v => !v)}
            id="note-pin-toggle"
            role="switch"
            aria-checked={isPinned}
            className={`relative w-12 h-6 rounded-full border transition-all duration-200 shrink-0
                        ${isPinned ? 'bg-violet-600 border-violet-500' : 'bg-white/5 border-white/15'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow
                              transition-transform duration-200
                              ${isPinned ? 'translate-x-6' : 'translate-x-0'}`}/>
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate(-1)}
                  className="btn-ghost flex-1" id="create-cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={saving}
                  className="btn-primary flex-1 py-3" id="create-save-btn">
            {saving
              ? <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"/>
                  Saving…
                </span>
              : (isEdit ? '💾 Update Note' : '✨ Save Note')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
