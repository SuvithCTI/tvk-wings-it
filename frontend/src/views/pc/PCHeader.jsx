import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TVKFlag } from '../../components/common/TVKFlag';
import { Shield, PhoneCall, UserCheck, LogOut } from 'lucide-react';

export const PCHeader = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo & Sleek Official TVK Flag */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="transform group-hover:scale-105 transition-transform duration-300">
            <TVKFlag className="w-11 h-7 shadow-sm rounded border border-amber-400/30" animated={false} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-wider text-tvk-red leading-tight">
              TAMILAGA VETTRI KAZHAGAM
            </span>
            <span className="font-tamil text-[11px] font-semibold text-slate-600">
              தமிழக வெற்றி கழகம்
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className={`font-semibold text-sm transition-colors py-1 ${
              isActive('/') ? 'text-tvk-red border-b-2 border-tvk-red' : 'text-slate-700 hover:text-tvk-red'
            }`}
          >
            Home
          </Link>
          <Link
            to="/developments"
            className={`font-semibold text-sm transition-colors py-1 ${
              isActive('/developments') ? 'text-tvk-red border-b-2 border-tvk-red' : 'text-slate-700 hover:text-tvk-red'
            }`}
          >
            Developments
          </Link>
          <Link
            to="/live-news"
            className={`font-semibold text-sm transition-colors py-1 flex items-center gap-1 ${
              isActive('/live-news') ? 'text-tvk-red border-b-2 border-tvk-red font-bold' : 'text-slate-700 hover:text-tvk-red'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Live News</span>
          </Link>
          <Link
            to="/services"
            className={`font-semibold text-sm transition-colors py-1 ${
              isActive('/services') ? 'text-tvk-red border-b-2 border-tvk-red' : 'text-slate-700 hover:text-tvk-red'
            }`}
          >
            Services
          </Link>
          <Link
            to="/ideology"
            className={`font-semibold text-sm transition-colors py-1 ${
              isActive('/ideology') ? 'text-tvk-red border-b-2 border-tvk-red' : 'text-slate-700 hover:text-tvk-red'
            }`}
          >
            Ideology
          </Link>
        </nav>

        {/* Right Callouts & Auth Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="tel:9876543210"
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 text-tvk-red rounded-full text-xs font-bold border border-rose-100 hover:bg-rose-100 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Hotline: 9876543210</span>
          </a>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 bg-tvk-red text-white text-xs font-bold rounded-xl shadow-sm hover:bg-tvk-darkred transition-colors"
              >
                <Shield className="w-4 h-4 text-tvk-yellow" />
                <span>{user.role === 'admin' ? 'Admin Control Desk' : 'My Dashboard'}</span>
              </Link>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 text-slate-500 hover:text-tvk-red hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-tvk-red text-white text-xs font-bold rounded-xl shadow-md hover:bg-tvk-darkred transition-all transform hover:-translate-y-0.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
