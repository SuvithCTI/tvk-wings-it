import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TVKFlag } from './components/common/TVKFlag';
import Home from './pages/Home';
import Developments from './pages/Developments';
import LiveNews from './pages/LiveNews';
import Services from './pages/Services';
import Ideology from './pages/Ideology';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center gap-6 p-4">
        <div className="perspective-1000">
          <TVKFlag className="w-48 h-32 rounded-xl shadow-2xl border border-amber-300" animated={true} />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-tvk-red tracking-widest uppercase">
            TAMILAGA VETTRI KAZHAGAM
          </h2>
          <p className="font-tamil text-sm font-bold text-slate-600">
            தமிழக வெற்றி கழகம்
          </p>
        </div>
        <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-tvk-red via-tvk-yellow to-tvk-red animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developments" element={<Developments />} />
          <Route path="/live-news" element={<LiveNews />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ideology" element={<Ideology />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
