import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/* Simple SVG icons (no extra lib needed) */
const PenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/8 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700
                            flex items-center justify-center shadow-glow-violet
                            group-hover:scale-110 transition-transform duration-200">
              <PenIcon />
            </div>
            <span className="font-display font-bold text-lg text-gradient tracking-tight">
              NoteNest
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:block text-xs text-slate-500 font-mono bg-white/5
                                 border border-white/10 px-2.5 py-1 rounded-lg">
                  {user.email ?? 'Signed in'}
                </span>
                <button
                  id="nav-logout-btn"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="btn-ghost text-red-400 border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOutIcon />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                {pathname !== '/login' && (
                  <Link to="/login" id="nav-login-link" className="btn-ghost">
                    Login
                  </Link>
                )}
                {pathname !== '/signup' && (
                  <Link to="/signup" id="nav-signup-link" className="btn-primary">
                    Sign Up
                  </Link>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;