import React from 'react';

export function AdminReportsPage() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Reports & exports</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {['Monthly compliance', 'Quarterly audit', 'Year-end summary', 'Custom export'].map((item) => (
                    <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6">
                        <p className="text-sm text-slate-600">{item}</p>
                        <button className="mt-4 rounded-full border border-indigo-200 px-4 py-2 text-xs text-indigo-700">
                            Generate
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
