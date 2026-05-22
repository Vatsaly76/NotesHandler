import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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

function Signup() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
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
                          border border-violet-500/30 mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round"
                 className="w-7 h-7 text-violet-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Create account</h1>
          <p className="text-slate-400 text-sm mt-1">Join NoteNest and start capturing ideas</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30
                          text-red-400 text-sm animate-slide-up" id="signup-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" id="signup-form">
          {/* Username */}
          <div>
            <label className="label" htmlFor="signup-username">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><UserIcon /></span>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="johndoe"
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="label" htmlFor="signup-email">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
              <input
                id="signup-email"
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
            <label className="label" htmlFor="signup-password">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><LockIcon /></span>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="input pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            id="signup-submit-btn"
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2 py-3"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Creating account…
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" id="signup-login-link"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;