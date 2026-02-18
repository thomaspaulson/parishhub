import React from 'react';
import { NavLink } from 'react-router-dom';
import { PageShell } from '../components/PageShell';

export function NotFoundPage() {
    return (
        <PageShell title="We couldn't find that page" subtitle="404">
            <p className="text-sm text-slate-600">The page you're looking for doesn't exist.</p>
            <div className="mt-6">
                <NavLink className="rounded-full border border-indigo-200 px-5 py-2 text-sm text-indigo-700" to="/">
                    Back to home
                </NavLink>
            </div>
        </PageShell>
    );
}
