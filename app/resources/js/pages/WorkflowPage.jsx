import React from 'react';
import { PageShell } from '../components/PageShell';
import { steps } from '../layouts/data';

export function WorkflowPage() {
    return (
        <PageShell title="A streamlined registration workflow" subtitle="Workflow">
            <div className="space-y-6">
                {steps.map((step) => (
                    <div key={step.step} className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-600">Step {step.step}</p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </PageShell>
    );
}
