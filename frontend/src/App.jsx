import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home    from './pages/Home';
import Login   from './pages/Login';
import Signup  from './pages/Signup';
import Navbar  from './components/Navbar';

/* ── Protected Route ──────────────────────────────────── */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

/* ── App ─────────────────────────────────────────────── */
function App() {
  return (
    <Router>
      <div className="min-h-dvh bg-grid flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login"  element={<Login />}  />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;