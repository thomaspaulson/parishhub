import React from 'react';

export function AdminRegistriesPage() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Registry review queue</h2>
            <div className="grid gap-4">
                {[
                    'St. Jude Parish • 12 pending',
                    'Holy Cross Parish • 5 pending',
                    'St. Anne Parish • 8 pending',
                ].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-sm text-slate-600">{item}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
