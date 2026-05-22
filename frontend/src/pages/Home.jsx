import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const FEATURES = [
  {
    icon: '🔒',
    title: 'Secure Auth',
    desc: 'JWT-based authentication with bcrypt password hashing keeps your notes private.',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Full-text search across titles, content, and tags — instantly powered by MongoDB.',
  },
  {
    icon: '📌',
    title: 'Pin & Organise',
    desc: 'Pin important notes to the top, tag them for context, and categorise by project.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'React + Vite frontend with a Node.js + Express backend — snappy in every interaction.',
  },
  {
    icon: '🏷️',
    title: 'Tags & Categories',
    desc: 'Add comma-separated tags and custom categories to keep your workspace tidy.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode',
    desc: 'Easy on your eyes. NoteNest is built dark-first with a premium glassmorphic design.',
  },
];

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-[calc(100dvh-4rem)]">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4 text-center">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]
                          rounded-full bg-violet-600/15 blur-[100px]"/>
          <div className="absolute bottom-0 right-1/4 w-80 h-80
                          rounded-full bg-cyan-500/10 blur-[80px]"/>
        </div>

        <div className="relative max-w-3xl mx-auto animate-fade-in">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                           bg-violet-500/15 text-violet-300 border border-violet-500/25 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-slow"/>
            Full-Stack MERN App
          </span>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl leading-tight text-white mb-6">
            Your ideas,{' '}
            <span className="text-gradient">beautifully organised</span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            NoteNest lets you capture, search, pin, and manage personal notes with full
            JWT authentication — built on the MERN stack.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Link to="/dashboard" id="hero-dashboard-btn" className="btn-primary px-8 py-3.5 text-base">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" id="hero-register-btn" className="btn-primary px-8 py-3.5 text-base">
                  Get Started Free
                </Link>
                <Link to="/login" id="hero-login-btn" className="btn-ghost px-8 py-3.5 text-base">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="relative max-w-2xl mx-auto mt-16 grid grid-cols-3 gap-px
                        rounded-2xl overflow-hidden border border-white/10">
          {[['MERN', 'Stack'], ['JWT', 'Secured'], ['100%', 'Open Source']].map(([val, label]) => (
            <div key={label} className="bg-white/5 backdrop-blur-sm py-5 px-4">
              <p className="font-display font-bold text-2xl text-gradient">{val}</p>
              <p className="text-slate-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24" id="features">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl">Everything you need</h2>
          <p className="text-slate-400 mt-2">Built with best practices from day one.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title}
                 className="glass p-6 hover:border-violet-500/40 hover:shadow-card-hover
                             transition-all duration-200 group animate-fade-in">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-violet-300 transition-colors">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      {!user && (
        <section className="max-w-3xl mx-auto px-4 pb-24">
          <div className="glass p-10 text-center bg-gradient-to-br from-violet-600/15 to-cyan-500/10
                          border-violet-500/30">
            <h2 className="font-display font-bold text-2xl text-white mb-3">
              Ready to take better notes?
            </h2>
            <p className="text-slate-400 mb-6">Create your free account in seconds.</p>
            <Link to="/register" id="cta-register-btn" className="btn-primary px-10 py-3 text-base">
              Create Free Account →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;