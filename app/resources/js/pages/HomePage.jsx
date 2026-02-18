import React from 'react';
import { features, stats, steps } from '../layouts/data';

export function HomePage() {
    return (
        <div>
            <div className="relative overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
                <div className="absolute top-40 right-12 h-60 w-60 rounded-full bg-cyan-400/30 blur-3xl" />

                <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-12 md:pt-20">
                    <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                        <div>
                            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs uppercase tracking-[0.3em] text-indigo-600">
                                Built for parish teams
                            </p>
                            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                                Modern records, sacred mission.
                            </h1>
                            <p className="mt-5 text-lg text-slate-600">
                                ParishHub is a secure single-page registry built for fast, consistent record
                                keeping. Capture vital events, manage your team, and generate reports without
                                leaving the app.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <button className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400">
                                    Start free trial
                                </button>
                                <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                                    View dashboard
                                </button>
                            </div>
                            <div className="mt-10 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
                                {stats.map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                                        <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Today</p>
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                                    Live updates
                                </span>
                            </div>
                            <div className="mt-6 space-y-4">
                                {[
                                    {
                                        title: 'Birth Registration',
                                        detail: 'Maria Lopez • St. Jude Parish',
                                        time: '2m ago',
                                    },
                                    {
                                        title: 'Marriage Certificate',
                                        detail: 'Samuel & Grace • Holy Cross',
                                        time: '18m ago',
                                    },
                                    {
                                        title: 'Death Record',
                                        detail: 'Joseph Kim • St. Anne Parish',
                                        time: '1h ago',
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-slate-900">{item.title}</p>
                                            <span className="text-xs text-slate-500">{item.time}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Features</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Everything your registry needs</h2>
                    </div>
                    <p className="max-w-xl text-slate-600">
                        Keep your team aligned with centralized records, automated numbering, and instant
                        exports. No more spreadsheets or paper files.
                    </p>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                            <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-10">
                    <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-cyan-600">Workflow</p>
                            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                                A guided path from intake to archive
                            </h2>
                            <p className="mt-4 text-slate-600">
                                Automate validations, surface duplicate checks, and securely store every
                                certificate for instant retrieval.
                            </p>
                            <button className="mt-6 rounded-full border border-cyan-300 px-5 py-2 text-sm text-cyan-700 transition hover:border-cyan-400">
                                Explore the flow
                            </button>
                        </div>
                        <div className="space-y-6">
                            {steps.map((step) => (
                                <div key={step.step} className="rounded-2xl border border-slate-200 bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600">
                                        Step {step.step}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8">
                        <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Insights</p>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Clear reporting for every review</h2>
                        <p className="mt-4 text-slate-600">
                            Track trends, verify record completeness, and export ready-to-share PDFs with
                            branded templates.
                        </p>
                        <ul className="mt-6 space-y-3 text-sm text-slate-600">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                                Monthly analytics and printable summaries.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                                Export data for diocesan reporting.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                                Automatically generate certificates.
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-8">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">Latest registry snapshot</p>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700">
                                Updated 5 min ago
                            </span>
                        </div>
                        <div className="mt-6 space-y-4">
                            {[
                                { label: 'Births', value: 184, delta: '+12%' },
                                { label: 'Marriages', value: 32, delta: '+3%' },
                                { label: 'Deaths', value: 61, delta: '-4%' },
                            ].map((item) => (
                                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-600">{item.label}</p>
                                        <span className="text-xs text-emerald-600">{item.delta}</span>
                                    </div>
                                    <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-20">
                <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-10 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Ready to start?</p>
                    <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                        Bring your parish records together today.
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                        Start a guided onboarding session and move your registry to a secure, searchable,
                        and collaborative workspace.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
                            Schedule onboarding
                        </button>
                        <button className="rounded-full border border-indigo-200 px-6 py-3 text-sm font-semibold text-indigo-700">
                            Talk to our team
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
