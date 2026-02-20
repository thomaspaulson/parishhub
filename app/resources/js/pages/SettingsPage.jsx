import React from 'react';
import { PageShell } from '../components/PageShell';

export function SettingsPage() {
    return (
        <PageShell title="Configure your registry" subtitle="Settings">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm text-slate-600">
                    Manage parish profile details, user roles, and notification preferences.
                </p>
            </div>
        </PageShell>
    );
}
