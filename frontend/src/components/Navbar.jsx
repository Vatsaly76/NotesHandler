import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logo = () => (
  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700
                  flex items-center justify-center shadow-glow-violet shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  </div>
);

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate         = useNavigate();
  const { pathname }     = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink = ({ to, children, id }) => (
    <Link
      to={to}
      id={id}
      onClick={() => setMenuOpen(false)}
      className={`nav-link px-3 py-1.5 rounded-lg transition-all duration-150
        ${pathname === to ? 'bg-violet-500/15 text-violet-300' : 'hover:bg-white/8'}`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-2xl border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 group" id="nav-logo">
            <Logo />
            <span className="font-display font-bold text-lg text-gradient tracking-tight">NoteNest</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                <NavLink to="/dashboard" id="nav-dashboard">Dashboard</NavLink>
                <NavLink to="/profile"   id="nav-profile">Profile</NavLink>
                <Link
                  to="/notes/new"
                  id="nav-new-note"
                  className="btn-primary ml-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                       strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  New Note
                </Link>
                <button onClick={handleLogout} id="nav-logout" className="btn-ghost ml-1 text-red-400 border-red-400/20 hover:bg-red-500/10">
                  Logout
                </button>
              </>
            ) : (
              <>
                {pathname !== '/login'    && <NavLink to="/login"    id="nav-login">Login</NavLink>}
                {pathname !== '/register' && <Link to="/register" id="nav-register" className="btn-primary ml-2">Get Started</Link>}
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden btn-ghost p-2" onClick={() => setMenuOpen(v => !v)} id="nav-mobile-toggle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6"  y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3"  y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 animate-slide-up border-t border-white/8 pt-3">
            {user ? (
              <>
                <NavLink to="/dashboard" id="nav-mob-dashboard">Dashboard</NavLink>
                <NavLink to="/notes/new" id="nav-mob-new">New Note</NavLink>
                <NavLink to="/profile"   id="nav-mob-profile">Profile</NavLink>
                <button onClick={handleLogout} className="nav-link text-left text-red-400 px-3 py-1.5" id="nav-mob-logout">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login"    id="nav-mob-login">Login</NavLink>
                <NavLink to="/register" id="nav-mob-register">Register</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;