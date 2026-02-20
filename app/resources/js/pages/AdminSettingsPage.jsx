import React from 'react';

export function AdminSettingsPage() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Admin settings</h2>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm text-slate-600">
                    Configure approval thresholds, audit policies, and data retention schedules.
                </p>
            </div>
        </section>
    );
}
