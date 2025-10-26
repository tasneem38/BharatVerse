import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Heritage from './pages/Heritage';
import Itinerary from './pages/Itinerary';
import Art from './pages/Art';

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  const showFooter = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/heritage" element={<Heritage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/art" element={<Art />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
