import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetData, setResetData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            setResetData(response?.data || null);
            toast.success('Reset link generated');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to generate reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#eef2ff_40%,_#e2e8f0_100%)] flex items-center justify-center px-4 py-10 font-sans">
            <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-slate-300/30 backdrop-blur">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="bg-slate-950 px-8 py-10 text-white sm:px-10">
                        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-3 text-primary-300">
                            <FiLock className="h-6 w-6" />
                        </div>
                        <h1 className="mt-8 text-3xl font-bold tracking-tight">Forgot your password?</h1>
                        <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                            Generate a reset link for the admin account. In this setup the link is shown on screen so you can use it immediately.
                        </p>

                        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                            <p className="font-medium text-white">Flow</p>
                            <p className="mt-2">1. Enter the admin email.</p>
                            <p>2. Copy the reset link or token.</p>
                            <p>3. Open the reset page and set a new password.</p>
                        </div>
                    </div>

                    <div className="p-8 sm:p-10">
                        <h2 className="text-2xl font-bold text-slate-900">Request reset link</h2>
                        <p className="mt-2 text-sm text-slate-500">We will generate a password reset link for the admin account.</p>

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-700">Admin email</span>
                                <div className="relative">
                                    <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                                        placeholder="admin@example.com"
                                    />
                                </div>
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? 'Generating...' : 'Generate reset link'}
                                <FiArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </form>

                        {resetData?.resetUrl && (
                            <div className="mt-6 rounded-2xl border border-primary-200 bg-primary-50 p-4 text-sm text-primary-900">
                                <p className="font-semibold">Reset link</p>
                                <a className="mt-2 block break-all underline" href={resetData.resetUrl}>
                                    {resetData.resetUrl}
                                </a>
                                <p className="mt-3 text-xs text-primary-700">Token: {resetData.token}</p>
                            </div>
                        )}

                        <div className="mt-8 text-sm text-slate-600">
                            Remembered your password?{' '}
                            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                Back to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}