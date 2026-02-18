import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialForm = {
    email: '',
    password: '',
    remember: false,
};

export function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState({ loading: false, error: '', message: '' });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ loading: true, error: '', message: '' });

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const message = errorBody?.message || 'Unable to sign in. Please check your credentials.';
                throw new Error(message);
            }

            const data = await response.json();
            const token = data?.token;

            if (token) {
                localStorage.setItem('auth_token', token);
            }

            setStatus({ loading: false, error: '', message: 'Signed in successfully.' });
            navigate('/admin', { replace: true });
        } catch (error) {
            setStatus({ loading: false, error: error.message, message: '' });
        }
    };

    return (
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Welcome back</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to ParishHub</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Access the admin console and manage registry workflows.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium text-slate-700" htmlFor="email">
                            Email address
                        </label>
                        <input
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                        <label className="flex items-center gap-2">
                            <input
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                name="remember"
                                type="checkbox"
                                checked={form.remember}
                                onChange={handleChange}
                            />
                            Remember me
                        </label>
                        <button className="text-indigo-600 hover:text-indigo-700" type="button">
                            Forgot password?
                        </button>
                    </div>

                    {status.error && (
                        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {status.error}
                        </div>
                    )}
                    {status.message && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {status.message}
                        </div>
                    )}

                    <button
                        className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                        type="submit"
                        disabled={status.loading}
                    >
                        {status.loading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>
            </div>
        </section>
    );
}
