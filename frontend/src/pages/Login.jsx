import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

/* Inline icons */
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

function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const { login } = useContext(AuthContext);
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
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
                          bg-gradient-to-br from-violet-500/30 to-violet-700/30
                          border border-violet-500/30 mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round"
                 className="w-7 h-7 text-violet-400">
              <path d="M15 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="15 3 15 8 21 8"/><line x1="9" y1="13" x2="15" y2="13"/>
              <line x1="9" y1="17" x2="11" y2="17"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your NoteNest account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30
                          text-red-400 text-sm animate-slide-up" id="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
          {/* Email */}
          <div>
            <label className="label" htmlFor="login-email">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="label" htmlFor="login-password">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><LockIcon /></span>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2 py-3"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Signing in…
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" id="login-signup-link"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;