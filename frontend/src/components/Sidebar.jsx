import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NAV_ITEMS = [
  { label: 'All Notes', to: '/dashboard', icon: '📋' },
  { label: 'Pinned',    to: '/dashboard?filter=pinned', icon: '📌' },
  { label: 'New Note',  to: '/notes/new', icon: '✏️' },
  { label: 'Profile',   to: '/profile',   icon: '👤' },
];

function Sidebar({ noteCount = 0, pinnedCount = 0, tags = [], activeTag, onTagClick }) {
  const { user }    = useContext(AuthContext);
  const { pathname, search } = useLocation();
  const currentPath  = pathname + search;

  const isActive = (to) => currentPath === to || (to === '/dashboard' && currentPath === '/dashboard');

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-6 sticky top-20 self-start"
           id="sidebar">

      {/* User mini card */}
      {user && (
        <div className="glass p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700
                          flex items-center justify-center font-bold text-white text-sm shrink-0">
            {(user.username?.[0] ?? user.email?.[0] ?? '?').toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.username || 'User'}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="glass p-4 grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-2xl font-display font-bold text-gradient">{noteCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total</p>
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-amber-400">{pinnedCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Pinned</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="glass p-2 flex flex-col gap-0.5" id="sidebar-nav">
        {NAV_ITEMS.map(({ label, to, icon }) => (
          <Link
            key={to}
            to={to}
            id={`sidebar-link-${label.toLowerCase().replace(' ', '-')}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-150
                        ${isActive(to)
                          ? 'bg-violet-500/20 text-violet-300'
                          : 'text-slate-400 hover:bg-white/8 hover:text-white'}`}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Tags filter */}
      {tags.length > 0 && (
        <div className="glass p-4" id="sidebar-tags">
          <p className="label mb-3">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onTagClick(null)}
              className={`tag cursor-pointer transition-all duration-150 ${!activeTag ? 'bg-violet-500/30 text-violet-200' : 'hover:bg-violet-500/20'}`}
              id="tag-filter-all"
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`tag cursor-pointer transition-all duration-150
                            ${activeTag === tag ? 'bg-violet-500/30 text-violet-200' : 'hover:bg-violet-500/20'}`}
                id={`tag-filter-${tag}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
