import React from 'react';
import { PageShell } from '../components/PageShell';

export function InsightsPage() {
    return (
        <PageShell title="Insightful reporting" subtitle="Insights">
            <div className="grid gap-6 md:grid-cols-2">
                {[
                    'Monthly summaries for diocesan review',
                    'Quarterly audit trails and certificate exports',
                    'Automated anomaly detection for duplicates',
                    'Secure backups with access history',
                ].map((item) => (
                    <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6">
                        <p className="text-sm text-slate-600">{item}</p>
                    </div>
                ))}
            </div>
        </PageShell>
    );
}
