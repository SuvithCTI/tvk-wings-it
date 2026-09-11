import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { sendOtpApi, verifyOtpApi, adminLoginApi } from '../../services/api';
import { Phone, KeyRound, ShieldCheck } from 'lucide-react';

export const MobileLogin = () => {
  const [loginMode, setLoginMode] = useState('otp'); // 'otp' | 'admin'
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [demoOtpCode, setDemoOtpCode] = useState('');
  const [adminUser, setAdminUser] = useState('arjuna.admin@tvk.org');
  const [adminPass, setAdminPass] = useState('admin123');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setLoading(true);
    try {
      const res = await sendOtpApi(phone);
      if (res.data.success) {
        setDemoOtpCode(res.data.demoOtp || '123456');
        setOtp(res.data.demoOtp || '123456');
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    try {
      const res = await verifyOtpApi(phone, otp);
      if (res.data.success) {
        loginSuccess(res.data.user, res.data.token);
        if (res.data.user.role === 'admin' || res.data.user.role === 'superadmin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminLoginApi({ username: adminUser, password: adminPass });
      if (res.data.success) {
        loginSuccess(res.data.user, res.data.token);
        if (res.data.user.role === 'admin' || res.data.user.role === 'superadmin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Admin authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      <MobileHeader />

      <section className="bg-gradient-to-b from-tvk-dark to-tvk-darkred text-white p-6 text-center">
        <span className="px-3 py-1 bg-tvk-yellow text-tvk-dark text-[10px] font-black uppercase rounded-full">
          {loginMode === 'admin' ? 'Admin Portal' : 'Mobile OTP Login'}
        </span>
        <h1 className="text-xl font-black text-white mt-2">
          {loginMode === 'admin' ? 'Admin Authentication' : 'Citizen & Member Login'}
        </h1>
      </section>

      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => { setLoginMode('otp'); setError(''); }}
          className={`flex-1 py-3 text-xs font-extrabold border-b-2 flex items-center justify-center gap-1 ${
            loginMode === 'otp' ? 'border-tvk-red text-tvk-red' : 'border-transparent text-gray-500'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>OTP Login</span>
        </button>
        <button
          onClick={() => { setLoginMode('admin'); setError(''); }}
          className={`flex-1 py-3 text-xs font-extrabold border-b-2 flex items-center justify-center gap-1 ${
            loginMode === 'admin' ? 'border-tvk-red text-tvk-red' : 'border-transparent text-gray-500'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Login</span>
        </button>
      </div>

      <div className="p-4 flex-1">
        <div className="bg-white p-5 rounded-2xl shadow border border-gray-200 space-y-4">
          {error && <p className="text-xs text-red-500 font-bold">{error}</p>}

          {loginMode === 'admin' ? (
            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              <div className="p-2.5 bg-amber-50 rounded-xl text-[11px] text-gray-700 space-y-1.5 border border-amber-300">
                <span className="font-extrabold text-slate-900 block">Select Role Login:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setAdminUser('arjuna.admin@tvk.org'); setAdminPass('admin123'); setError(''); }}
                    className="p-2 bg-tvk-red text-white rounded-lg text-[10px] font-black text-center truncate"
                  >
                    ⭐ Aadhav Arjuna
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAdminUser('anand.admin@tvk.org'); setAdminPass('admin123'); setError(''); }}
                    className="p-2 bg-slate-900 text-white rounded-lg text-[10px] font-black text-center truncate"
                  >
                    ⭐ N. Anand
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Admin Email / Username *</label>
                <input
                  type="text"
                  required
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 bg-gray-50 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-red"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Admin Password *</label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 bg-gray-50 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-red"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-tvk-red text-white text-xs font-black rounded-xl shadow flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{loading ? 'Authenticating...' : 'Login to Command Desk'}</span>
              </button>
            </form>
          ) : step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210 (Admin) or Mobile"
                  className="w-full mt-1 px-3 py-2.5 bg-gray-50 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-red"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-tvk-red text-white text-xs font-black rounded-xl shadow flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{loading ? 'Sending...' : 'Send OTP'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-xl text-center">
                <span className="text-[11px] text-gray-600 block">OTP Sent to +91 {phone}</span>
                <span className="text-xs font-bold text-tvk-red">Demo OTP: {demoOtpCode}</span>
              </div>

              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border rounded-xl text-base font-mono text-center font-bold"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-tvk-red text-white text-xs font-black rounded-xl shadow flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{loading ? 'Verifying...' : 'Verify OTP'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
};
