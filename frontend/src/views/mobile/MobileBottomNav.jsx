import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Home, Layers, Wrench, Shield, UserCheck, Flame, Radio } from 'lucide-react';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 flex items-center justify-around md:hidden shadow-lg">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
          isActive('/') ? 'text-tvk-red' : 'text-gray-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link
        to="/developments"
        className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
          isActive('/developments') ? 'text-tvk-red' : 'text-gray-500'
        }`}
      >
        <Layers className="w-5 h-5" />
        <span>Projects</span>
      </Link>

      <Link
        to="/live-news"
        className={`flex flex-col items-center gap-1 text-[11px] font-bold relative ${
          isActive('/live-news') ? 'text-tvk-red' : 'text-gray-500'
        }`}
      >
        <Radio className="w-5 h-5 text-tvk-red animate-pulse" />
        <span>News</span>
      </Link>

      <Link
        to="/services"
        className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
          isActive('/services') ? 'text-tvk-red' : 'text-gray-500'
        }`}
      >
        <Wrench className="w-5 h-5" />
        <span>Services</span>
      </Link>

      <Link
        to="/ideology"
        className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
          isActive('/ideology') ? 'text-tvk-red' : 'text-gray-500'
        }`}
      >
        <Flame className="w-5 h-5" />
        <span>Ideology</span>
      </Link>

      {user ? (
        <Link
          to="/admin"
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            isActive('/admin') ? 'text-tvk-red' : 'text-gray-500'
          }`}
        >
          <Shield className="w-5 h-5 text-tvk-gold" />
          <span>Admin</span>
        </Link>
      ) : (
        <Link
          to="/login"
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            isActive('/login') ? 'text-tvk-red' : 'text-gray-500'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span>Login</span>
        </Link>
      )}
    </nav>
  );
};
