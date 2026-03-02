import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export function DashboardPage() {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isMounted = true;

        const loadSummary = async () => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                const response = await api.get('/api/dashboard');
                if (isMounted) {
                    setSummary(response.data ?? null);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadSummary();

        return () => {
            isMounted = false;
        };
    }, []);

    const cards = useMemo(() => {
        const totals = summary?.totals ?? {};
        return [
            { label: 'Birth records', value: totals.births ?? 0, to: '/admin/births' },
            { label: 'Marriage records', value: totals.marriages ?? 0, to: '/admin/marriages' },
            { label: 'Death records', value: totals.deaths ?? 0, to: '/admin/deaths' },
            { label: 'Users', value: totals.users ?? 0, to: '/admin/users' },
            { label: 'Admins', value: totals.admins ?? 0, to: '/admin/users' },
        ];
    }, [summary]);

    return (
        <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Overview</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Administrative command center</h2>
                <p className="mt-3 text-sm text-slate-600">
                    Monitor submissions, approvals, and compliance readiness across all parishes.
                </p>
            </div>
            {errorMessage && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {errorMessage}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-3">
                {isLoading ? (
                    <div className="col-span-full rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
                        Loading dashboard summary...
                    </div>
                ) : (
                    cards.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                        >
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
                            <p className="mt-2 text-xs font-semibold text-indigo-600">View details →</p>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
}
