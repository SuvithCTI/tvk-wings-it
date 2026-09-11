import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TVKFlag } from '../../components/common/TVKFlag';
import { Menu, X, Shield, UserCheck, LogOut, Sparkles } from 'lucide-react';

export const MobileHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <TVKFlag className="w-9 h-6 shadow-sm rounded" animated={false} />
          <div>
            <h1 className="font-extrabold text-xs text-tvk-red leading-none">TAMILAGA VETTRI KAZHAGAM</h1>
            <p className="font-tamil text-[9px] text-slate-600">தமிழக வெற்றி கழகம்</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle Navigation"
          >
            {drawerOpen ? <X className="w-4 h-4 text-tvk-red" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fadeIn" onClick={() => setDrawerOpen(false)}>
          <div
            className="absolute top-14 right-0 w-4/5 max-w-xs bg-white h-[calc(100vh-3.5rem)] p-5 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-5">
              <div className="pb-3 border-b border-slate-100 flex items-center gap-2.5">
                <TVKFlag className="w-8 h-5 rounded" animated={false} />
                <div>
                  <p className="text-[11px] font-bold text-tvk-red uppercase tracking-wider">Tamilaga Vettri Kazhagam</p>
                  <p className="font-tamil text-[11px] text-slate-700">TVK IT Wing Desk</p>
                </div>
              </div>

              <nav className="flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                    isActive('/') ? 'bg-tvk-red text-white' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  <span>Home</span>
                  <Sparkles className="w-3.5 h-3.5 opacity-70" />
                </Link>
                <Link
                  to="/developments"
                  onClick={() => setDrawerOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                    isActive('/developments') ? 'bg-tvk-red text-white' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  <span>Developments</span>
                  <Sparkles className="w-3.5 h-3.5 opacity-70" />
                </Link>
                <Link
                  to="/services"
                  onClick={() => setDrawerOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                    isActive('/services') ? 'bg-tvk-red text-white' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  <span>Services</span>
                  <Sparkles className="w-3.5 h-3.5 opacity-70" />
                </Link>
                <Link
                  to="/ideology"
                  onClick={() => setDrawerOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between ${
                    isActive('/ideology') ? 'bg-tvk-red text-white' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  <span>Ideology</span>
                  <Sparkles className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </nav>
            </div>

            <div className="pt-3 border-t border-slate-100">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/admin"
                    onClick={() => setDrawerOpen(false)}
                    className="w-full py-2.5 bg-tvk-red text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow"
                  >
                    <Shield className="w-4 h-4 text-tvk-yellow" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <button
                    onClick={() => { logout(); setDrawerOpen(false); }}
                    className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setDrawerOpen(false)}
                    className="w-full py-2.5 bg-tvk-red text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Citizen Login</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
