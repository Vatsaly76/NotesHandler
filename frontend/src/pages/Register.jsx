import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 7L2 7"/>
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

function Register() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const { register } = useContext(AuthContext);
  const navigate     = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-4rem)] px-4 py-12">
      <div className="auth-card">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                          bg-gradient-to-br from-violet-500/30 to-cyan-500/20
                          border border-violet-500/30 mb-4 text-2xl">
            🚀
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Create your account</h1>
          <p className="text-slate-400 text-sm mt-1">Join NoteNest and start capturing ideas</p>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30
                          text-red-400 text-sm animate-slide-up" id="register-error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" id="register-form">
          <div>
            <label className="label" htmlFor="reg-username">Username</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2"><UserIcon /></span>
              <input id="reg-username" type="text" value={username}
                     onChange={e => setUsername(e.target.value)}
                     placeholder="johndoe" className="input pl-10" required />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="reg-email">Email</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2"><MailIcon /></span>
              <input id="reg-email" type="email" value={email}
                     onChange={e => setEmail(e.target.value)}
                     placeholder="you@example.com" className="input pl-10" required />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="reg-password">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2"><LockIcon /></span>
              <input id="reg-password" type="password" value={password}
                     onChange={e => setPassword(e.target.value)}
                     placeholder="Min. 6 characters" className="input pl-10"
                     required minLength={6} />
            </div>
          </div>

          <button id="reg-submit-btn" type="submit" disabled={loading}
                  className="btn-primary w-full py-3 mt-2">
            {loading
              ? <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"/>
                  Creating account…
                </span>
              : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" id="reg-login-link"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
