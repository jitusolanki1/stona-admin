export default function SecurityCard({ changeForm, onChange, onChangePassword, onForgotPassword, busy }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Security</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">Password controls</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Change your password or generate a reset link if you forget it.
                    </p>
                </div>
            </div>

            <form onSubmit={onChangePassword} className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <input
                        type="password"
                        value={changeForm.currentPassword}
                        onChange={(e) => onChange('currentPassword', e.target.value)}
                        className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-500 focus:bg-white"
                        placeholder="Current password"
                    />
                    <input
                        type="password"
                        value={changeForm.newPassword}
                        onChange={(e) => onChange('newPassword', e.target.value)}
                        className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-500 focus:bg-white"
                        placeholder="New password"
                    />
                    <input
                        type="password"
                        value={changeForm.confirmPassword}
                        onChange={(e) => onChange('confirmPassword', e.target.value)}
                        className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary-500 focus:bg-white"
                        placeholder="Confirm password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={busy}
                    className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {busy ? 'Updating...' : 'Change Password'}
                </button>
            </form>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-800">Forgot password flow</p>
                <p className="mt-1 text-sm text-slate-600">
                    Generate a reset link for the admin email and use it to set a new password.
                </p>
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="mt-4 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-300 hover:text-primary-700"
                >
                    Send reset link
                </button>
            </div>
        </div>
    );
}