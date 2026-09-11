import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PCHeader } from './PCHeader';
import { PCFooter } from './PCFooter';
import { sendOtpApi, verifyOtpApi, adminLoginApi } from '../../services/api';
import { Phone, Lock, Shield, ArrowRight, KeyRound, UserCheck, ShieldCheck } from 'lucide-react';

export const PCLogin = () => {
  const [loginMode, setLoginMode] = useState('otp'); // 'otp' | 'admin'
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [demoOtpCode, setDemoOtpCode] = useState('');
  
  // Admin Login State
  const [adminUser, setAdminUser] = useState('arjuna.admin@tvk.org');
  const [adminPass, setAdminPass] = useState('admin123');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await sendOtpApi(phone);
      if (res.data.success) {
        setDemoOtpCode(res.data.demoOtp || '123456');
        setOtp(res.data.demoOtp || '123456');
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await verifyOtpApi(phone, otp, name);
      if (res.data.success) {
        loginSuccess(res.data.user, res.data.token);
        if (res.data.user.role === 'admin' || res.data.user.role === 'superadmin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP verification.');
    } finally {
      setLoading(false);
    }
  };

  // Admin Login Submit
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
      setError(err.response?.data?.message || 'Admin login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PCHeader />

      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-tvk-dark via-tvk-darkred to-black text-white p-8 text-center space-y-2 relative">
            <div className="w-12 h-12 bg-tvk-red text-tvk-yellow rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-lg">
              TVK
            </div>
            <h2 className="font-extrabold text-2xl">
              {loginMode === 'admin' ? 'Admin Portal Control Desk' : 'Citizen & Member Login'}
            </h2>
            <p className="font-tamil text-xs text-tvk-yellow font-bold">
              தமிழக வெற்றி கழகம் அதிகாரப்பூர்வ உள்நுழைவு
            </p>
          </div>

          {/* Mode Selector Switch */}
          <div className="flex border-b border-gray-200 bg-gray-50/50">
            <button
              onClick={() => { setLoginMode('otp'); setError(''); }}
              className={`flex-1 py-3.5 text-xs font-extrabold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                loginMode === 'otp'
                  ? 'border-tvk-red text-tvk-red bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Mobile OTP Login</span>
            </button>

            <button
              onClick={() => { setLoginMode('admin'); setError(''); }}
              className={`flex-1 py-3.5 text-xs font-extrabold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                loginMode === 'admin'
                  ? 'border-tvk-red text-tvk-red bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Login</span>
            </button>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-tvk-red text-xs font-bold rounded-xl flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}

            {loginMode === 'admin' ? (
              <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-300 rounded-2xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 block uppercase">Role Login Quick Fill</span>
                    <span className="px-2 py-0.5 bg-tvk-red text-white font-mono text-[10px] rounded-full">Multi-Tier Role Access</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => { setAdminUser('arjuna.admin@tvk.org'); setAdminPass('admin123'); setError(''); }}
                      className="p-2.5 bg-tvk-red text-white rounded-xl text-xs font-black text-left hover:bg-tvk-darkred transition-all border border-rose-400 shadow-xs"
                    >
                      <span className="block text-tvk-yellow text-[10px]">⭐ Villivakkam MLA Desk</span>
                      <span className="truncate block text-sm">Aadhav Arjuna</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setAdminUser('anand.admin@tvk.org'); setAdminPass('admin123'); setError(''); }}
                      className="p-2.5 bg-slate-900 text-white rounded-xl text-xs font-black text-left hover:bg-slate-800 transition-all border border-amber-300 shadow-xs"
                    >
                      <span className="block text-tvk-yellow text-[10px]">⭐ T. Nagar MLA Desk</span>
                      <span className="truncate block text-sm">N. Anand (Bussy Anand)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Admin Email / Username *</label>
                  <input
                    type="text"
                    required
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-tvk-red outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Admin Password *</label>
                  <input
                    type="password"
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-tvk-red outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-tvk-red hover:bg-tvk-darkred text-white text-xs font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <ShieldCheck className="w-4 h-4 text-tvk-yellow" />
                  <span>{loading ? 'Authenticating Role Access...' : 'Login to Command Desk'}</span>
                </button>
              </form>
            ) : step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Phone Number *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-xs font-bold text-gray-500">+91</span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210 (Admin) or Mobile"
                      className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-tvk-red focus:bg-white outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">
                    Enter your 10-digit mobile number to receive an instant verification OTP.
                  </p>
                  <p className="text-[11px] text-tvk-red font-bold mt-1">
                    Tip: Enter 9876543210 for Admin Access demo!
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. K. Raja"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-tvk-red outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-tvk-red hover:bg-tvk-darkred text-white text-xs font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-tvk-yellow" />
                  <span>{loading ? 'Sending OTP...' : 'Send Verification OTP'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                  <span className="text-xs text-gray-600 block">OTP Sent to <strong>+91 {phone}</strong></span>
                  <span className="text-xs font-bold text-tvk-red block mt-1">
                    Demo Verification OTP Code: <u className="font-mono text-sm">{demoOtpCode}</u>
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">6-Digit OTP Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-lg font-mono text-center font-bold tracking-widest focus:ring-2 focus:ring-tvk-red outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-tvk-red hover:bg-tvk-darkred text-white text-xs font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <KeyRound className="w-4 h-4 text-tvk-yellow" />
                  <span>{loading ? 'Verifying...' : 'Verify OTP & Login'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-xs text-gray-500 font-bold hover:underline text-center block"
                >
                  Change Mobile Number
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <PCFooter />
    </div>
  );
};
