import React from 'react';

export function PageShell({ title, subtitle, children }) {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">{subtitle}</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h2>
            </div>
            {children}
        </section>
    );
}
