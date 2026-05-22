import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { notesAPI }    from '../services/api';

function Profile() {
  const { user, logout }        = useContext(AuthContext);
  const navigate                = useNavigate();
  const [noteCount, setNoteCount] = useState(null);
  const [pinnedCount, setPinnedCount] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await notesAPI.getAll();
        setNoteCount(res.data.length);
        setPinnedCount(res.data.filter(n => n.isPinned).length);
      } catch {
        setNoteCount(0);
        setPinnedCount(0);
      }
    })();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const avatar = (user?.username?.[0] ?? user?.email?.[0] ?? '?').toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="section-title">👤 Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Your account information and stats</p>
      </div>

      {/* Avatar + info card */}
      <div className="glass p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700
                        flex items-center justify-center text-3xl font-display font-bold text-white
                        shadow-glow-violet shrink-0">
          {avatar}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-display font-bold text-2xl text-white">
            {user?.username || 'User'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            <span className="tag">🟢 Active Account</span>
            <span className="tag">🔒 JWT Secured</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total Notes', value: noteCount, icon: '📋', color: 'text-violet-400' },
          { label: 'Pinned',      value: pinnedCount, icon: '📌', color: 'text-amber-400' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="glass p-6 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <p className={`font-display font-bold text-3xl ${color}`}>
              {value === null
                ? <span className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin inline-block"/>
                : value}
            </p>
            <p className="text-slate-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Account details */}
      <div className="glass p-6 space-y-4">
        <h3 className="font-semibold text-white text-sm uppercase tracking-widest text-slate-400">
          Account Details
        </h3>
        {[
          { label: 'Username', value: user?.username || '—' },
          { label: 'Email',    value: user?.email    || '—' },
          { label: 'User ID',  value: user?.id       || '—' },
          { label: 'Auth',     value: 'JWT Bearer Token' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
            <span className="text-slate-400 text-sm">{label}</span>
            <span className="text-slate-200 text-sm font-mono truncate max-w-[60%] text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => navigate('/dashboard')} className="btn-ghost flex-1" id="profile-dashboard-btn">
          ← Dashboard
        </button>
        <button onClick={handleLogout}
                className="flex-1 py-2.5 px-4 rounded-xl border border-red-500/30 text-red-400
                           hover:bg-red-500/10 hover:text-red-300 transition-all duration-150
                           font-medium text-sm"
                id="profile-logout-btn">
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
