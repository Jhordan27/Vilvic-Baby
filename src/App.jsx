import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home/Home';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border)',
          marginTop: '4rem',
          fontSize: '14px'
        }}>
          <strong>Vilvic Cajamarca</strong> © {new Date().getFullYear()} <br />
         Hecho con ❤️ en Cajamarca
      </footer>
    </div>
  );
}

export default App;
