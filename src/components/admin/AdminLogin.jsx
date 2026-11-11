import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { adminLogin } from '../../services/api';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const data = await adminLogin(username, password);
      onLoginSuccess(data.token, data.user);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#087CFF]/15 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="relative w-full max-w-md rounded-3xl bg-[#0B1730] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl z-10 space-y-6">
        
        {/* Back to site */}
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-1.5 text-xs text-[#A8B5C7] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <img
            src="/brand/rydentec-logo.png"
            alt="RydenTec"
            className="h-9 w-auto mx-auto object-contain mb-3"
          />
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#101F35] border border-[#087CFF]/30 text-[11px] font-semibold text-[#00D5FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Management Access</span>
          </div>
          <h2 className="text-xl font-bold text-white pt-2">
            Administrator Portal
          </h2>
          <p className="text-xs text-[#A8B5C7]">
            Sign in to manage inquiries, update portfolio, and view live metrics.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-2.5 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A8B5C7] mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#A8B5C7] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101F35] border border-white/10 text-white text-xs placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A8B5C7] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A8B5C7] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101F35] border border-white/10 text-white text-xs placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF]"
              />
            </div>
            <div className="text-[10px] text-[#A8B5C7]/60 mt-1">
              Default administrator key: <code className="text-[#00D5FF]">RydenTec2026!</code>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-xs shadow-lg shadow-[#087CFF]/30 hover:shadow-[#087CFF]/50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
