import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiLock, FiKey } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await api.post('/auth/reset-password', { token, password });
            toast.success('Password reset successful');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
            <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 p-3 text-primary-300">
                    <FiLock className="h-6 w-6" />
                </div>
                <h1 className="mt-6 text-3xl font-bold tracking-tight">Reset password</h1>
                <p className="mt-2 text-sm text-slate-300">Enter a new password for the admin account.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300 break-all">
                        Token: {token}
                    </div>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-200">New password</span>
                        <div className="relative">
                            <FiKey className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary-400"
                                placeholder="New password"
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-200">Confirm password</span>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition focus:border-primary-400"
                            placeholder="Confirm password"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-2xl bg-primary-500 px-4 py-3.5 text-sm font-medium text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? 'Resetting...' : 'Reset password'}
                    </button>
                </form>

                <div className="mt-6 text-sm text-slate-300">
                    <Link to="/login" className="font-medium text-primary-300 hover:text-primary-200">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}