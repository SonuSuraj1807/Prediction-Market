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
        <div className="min-h-screen flex items-center justify-center bg-surface px-4">
            <div className="w-full max-w-sm space-y-10 py-12">
                {/* Logo & Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold text-text tracking-tight uppercase">
                        {APP_NAME}
                    </h1>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">
                        Global Prediction Market
                    </p>
                </div>

                <div className="card-modern p-8 bg-surface/50 space-y-8">
                    {/* Mode Toggle */}
                    <div className="flex p-1 bg-surface-raised rounded-xl border border-border">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${mode === 'login' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${mode === 'signup' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Google OAuth */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface-raised border border-border rounded-xl font-bold uppercase tracking-widest text-[11px] text-text hover:bg-surface-higher hover:border-primary transition-all disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-widest">
                            <span className="px-3 bg-surface text-text-muted">or email</span>
                        </div>
                    </div>

                    {!emailSent ? (
                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            {mode === 'signup' && (
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest ml-1">Username</label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Enter username"
                                        className="w-full input-modern px-4 py-2.5 text-xs"
                                        required
                                    />
                                </div>
                            )}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest ml-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full input-modern px-4 py-2.5 text-xs"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest ml-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full input-modern px-4 py-2.5 text-xs"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {loading ? 'Checking...' : mode === 'signup' ? 'Create Account' : 'Login'}
                            </button>

                        </form>
                    ) : (
                        <div className="text-center space-y-4 py-6 bg-primary/5 border border-primary/20 rounded-2xl">
                            <div className="text-2xl">📧</div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Check your email</p>
                            <p className="text-[11px] text-text-muted font-medium px-4">Follow the link in your inbox to verify your account.</p>
                            <button onClick={() => setEmailSent(false)} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Back</button>
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-widest">
                            <span className="px-3 bg-surface text-text-muted">or phone</span>
                        </div>
                    </div>

                    {/* Phone OTP */}
                    {step === 'phone' ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface-raised px-3 py-2.5 rounded-xl border border-border">+91</span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="Mobile number"
                                    className="flex-1 input-modern px-4 py-2.5 text-xs font-bold"
                                />
                            </div>
                            <button
                                onClick={handleSendOtp}
                                disabled={phone.length !== 10 || loading}
                                className="w-full py-3 bg-surface-raised border border-border text-text font-bold uppercase tracking-widest text-[11px] hover:bg-surface-higher hover:border-primary transition-all disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-[11px] font-semibold text-text-muted text-center">
                                OTP sent to +91{phone}
                            </p>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                className="w-full input-modern px-4 py-3 text-center tracking-[0.5em] font-bold text-lg"
                            />
                            <button
                                onClick={handleVerifyOtp}
                                disabled={otp.length !== 6 || loading}
                                className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                            <button onClick={() => setStep('phone')} className="w-full text-[9px] font-bold text-text-muted uppercase tracking-widest hover:text-text">
                                ← Change number
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                            <p className="text-rose-500 text-[10px] font-bold text-center uppercase tracking-widest">{error}</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <p className="text-center text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed px-4">
                        By continuing, you acknowledge our{' '}
                        <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
