'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { APP_NAME } from '@/lib/constants';

export default function LoginPage() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) setError(error.message);
        setLoading(false);
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (mode === 'signup') {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { display_name: displayName },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) setError(error.message);
            else {
                setEmailSent(true);
                setError('Please check your email to confirm your account.');
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) setError(error.message);
            else window.location.href = '/markets';
        }
        setLoading(false);
    };

    const handleSendOtp = async () => {
        setLoading(true);
        setError('');
        const { error } = await supabase.auth.signInWithOtp({
            phone: `+91${phone}`,
        });
        if (error) {
            setError(error.message);
        } else {
            setStep('otp');
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError('');
        const { error } = await supabase.auth.verifyOtp({
            phone: `+91${phone}`,
            token: otp,
            type: 'sms',
        });
        if (error) {
            setError(error.message);
        } else {
            window.location.href = '/markets';
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 px-4">
            <div className="w-full max-w-md space-y-8 py-12">
                {/* Logo & Title */}
                <div className="text-center">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tighter uppercase">
                        {APP_NAME}
                    </h1>
                    <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                        The Future of Prediction Markets
                    </p>
                </div>

                <div className="bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] border border-gray-800/50 p-10 shadow-2xl space-y-8">
                    {/* Mode Toggle */}
                    <div className="flex p-1 bg-gray-950 rounded-2xl border border-gray-800">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Google OAuth */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white text-gray-900 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800" />
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                            <span className="px-4 bg-[#0a0a0f] text-gray-600">or use email</span>
                        </div>
                    </div>

                    {!emailSent ? (
                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            {mode === 'signup' && (
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Display Name</label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Username"
                                        className="w-full px-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            )}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Login'}
                            </button>

                        </form>
                    ) : (
                        <div className="text-center space-y-4 py-8 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl">
                            <div className="text-3xl">📧</div>
                            <p className="text-indigo-400 font-black uppercase tracking-widest text-sm">Verify your email</p>
                            <p className="text-xs text-gray-500 font-bold px-4">We've sent a confirmation link to your inbox. Please follow the instructions to continue.</p>
                            <button onClick={() => setEmailSent(false)} className="text-xs font-black text-indigo-400 uppercase tracking-widest hover:underline">Back to login</button>
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800" />
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                            <span className="px-4 bg-[#0a0a0f] text-gray-600">or use phone</span>
                        </div>
                    </div>

                    {/* Phone OTP */}
                    {step === 'phone' ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest bg-gray-950 px-4 py-[1.125rem] rounded-2xl border border-gray-800">+91</span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="10-digit mobile"
                                    className="flex-1 px-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                                />
                            </div>
                            <button
                                onClick={handleSendOtp}
                                disabled={phone.length !== 10 || loading}
                                className="w-full py-4 bg-gray-800 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-gray-700 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">
                                OTP sent to +91{phone}
                            </p>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                className="w-full px-6 py-4 bg-gray-950 border border-gray-800 rounded-2xl text-white text-center tracking-[0.5em] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-black text-xl"
                            />
                            <button
                                onClick={handleVerifyOtp}
                                disabled={otp.length !== 6 || loading}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                            <button onClick={() => setStep('phone')} className="w-full text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-gray-400">
                                ← Change number
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                            <p className="text-rose-500 text-[10px] font-black text-center uppercase tracking-widest">{error}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <p className="text-center text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] leading-relaxed">
                        By continuing, you acknowledge our{' '}
                        <a href="/terms" className="text-indigo-500 hover:text-indigo-400 transition-colors">Digital Covenant</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-indigo-500 hover:text-indigo-400 transition-colors">Privacy Shield</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
