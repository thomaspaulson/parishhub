import React from 'react';

export function AdminDashboardPage() {
    return (
        <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Overview</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Administrative command center</h2>
                <p className="mt-3 text-sm text-slate-600">
                    Monitor submissions, approvals, and compliance readiness across all parishes.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { label: 'Pending approvals', value: '48' },
                    { label: 'Flagged records', value: '6' },
                    { label: 'Active staff', value: '23' },
                ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                        <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
