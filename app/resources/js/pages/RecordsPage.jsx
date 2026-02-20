import React from 'react';
import { PageShell } from '../components/PageShell';

export function RecordsPage() {
    return (
        <PageShell title="Your parish records" subtitle="Records">
            <div className="grid gap-6 md:grid-cols-3">
                {['Births', 'Marriages', 'Deaths'].map((item) => (
                    <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item}</p>
                        <p className="mt-3 text-2xl font-semibold text-slate-900">
                            {Math.floor(Math.random() * 200) + 40}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">Entries recorded this month.</p>
                    </div>
                ))}
            </div>
        </PageShell>
    );
}
