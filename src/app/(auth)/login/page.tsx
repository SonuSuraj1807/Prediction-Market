'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { APP_NAME } from '@/lib/constants';

export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/markets` },
        });
        if (error) setError(error.message);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
            <div className="w-full max-w-md p-8 space-y-8">
                {/* Logo & Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {APP_NAME}
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Trade on real-world events. Test your predictions.
                    </p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 space-y-6">
                    {/* Google OAuth */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-900/50 text-gray-500">or use phone</span>
                        </div>
                    </div>

                    {/* Phone OTP */}
                    {step === 'phone' ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-sm bg-gray-800 px-3 py-3 rounded-l-xl border border-gray-700">+91</span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="Enter 10-digit mobile"
                                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-r-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={handleSendOtp}
                                disabled={phone.length !== 10 || loading}
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-400 text-center">
                                OTP sent to +91{phone}
                            </p>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="Enter 6-digit OTP"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-center tracking-[0.5em] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                onClick={handleVerifyOtp}
                                disabled={otp.length !== 6 || loading}
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                            <button onClick={() => setStep('phone')} className="w-full text-sm text-gray-500 hover:text-gray-300">
                                ← Change number
                            </button>
                        </div>
                    )}

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                </div>

                <p className="text-center text-xs text-gray-600">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="text-indigo-400 hover:underline">Terms</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}
