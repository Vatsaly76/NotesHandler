import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar         from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';

/* Pages */
import Home       from './pages/Home';
import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import CreateNote from './pages/CreateNote';
import Profile    from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-dvh bg-grid flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* ── Public routes ── */}
            <Route path="/"         element={<Home />}     />
            <Route path="/login"    element={<Login />}    />
            <Route path="/register" element={<Register />} />

            {/* ── Protected routes ── */}
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/notes/new" element={
              <ProtectedRoute><CreateNote /></ProtectedRoute>
            } />
            <Route path="/notes/:id/edit" element={
              <ProtectedRoute><CreateNote /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />

            {/* ── Fallback ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;