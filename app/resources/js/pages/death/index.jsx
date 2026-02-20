import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function DeathListPage() {
    const [deaths, setDeaths] = useState([]);
    const [meta, setMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const loadDeaths = useCallback(async (url = '/api/deaths?per_page=15') => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(url, {
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Unable to load death records.');
            }

            const payload = await response.json();
            setDeaths(payload.data ?? []);
            setMeta(payload.meta ?? null);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDeaths();
    }, [loadDeaths]);

    const totalLabel = useMemo(() => {
        if (!meta) {
            return null;
        }

        return `Showing ${meta.from ?? 0}-${meta.to ?? 0} of ${meta.total ?? 0}`;
    }, [meta]);

    const handleDelete = async (recordId) => {
        if (!window.confirm('Delete this record?')) {
            return;
        }

        setDeletingId(recordId);
        setErrorMessage('');

        try {
            const response = await fetch(`/api/deaths/${recordId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Unable to delete the death record.');
            }

            await loadDeaths();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <header>
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">Death records</h2>
                        {totalLabel && <p className="mt-1 text-sm text-slate-500">{totalLabel}</p>}
                    </div>
                </header>

                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        to="/admin/deaths/create"
                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Add record
                    </Link>
                    <button
                        type="button"
                        onClick={() => loadDeaths()}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {errorMessage && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {errorMessage}
                </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <table className="min-w-full divide-y divide-slate-100 text-sm">
                    <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Date of death</th>
                            <th className="px-4 py-3">Place of burial</th>
                            <th className="px-4 py-3">Registry</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                                    Loading records...
                                </td>
                            </tr>
                        ) : deaths.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                                    No death records yet.
                                </td>
                            </tr>
                        ) : (
                            deaths.map((record) => (
                                <tr key={record.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-4">
                                        <div className="font-semibold text-slate-900">{record.full_name}</div>
                                        <div className="text-xs text-slate-500">{record.address}</div>
                                    </td>
                                    <td className="px-4 py-4 text-slate-700">{record.date_of_death}</td>
                                    <td className="px-4 py-4 text-slate-700">{record.place_of_burial}</td>
                                    <td className="px-4 py-4 text-slate-700">
                                        {record.reg_no}
                                        {record.page_no ? ` · p.${record.page_no}` : ''}
                                        {record.book_no ? ` · b.${record.book_no}` : ''}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                to={`/admin/deaths/${record.id}/edit`}
                                                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(record.id)}
                                                className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:border-rose-300"
                                                disabled={deletingId === record.id}
                                            >
                                                {deletingId === record.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {meta?.links && (
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    {meta.links.map((link) => (
                        <button
                            key={link.label}
                            type="button"
                            onClick={() => link.url && loadDeaths(`${link.url}&per_page=${meta}`)}
                            className={`rounded-full border px-3 py-1 ${link.active ? 'border-indigo-500 text-indigo-600' : 'border-slate-200 text-slate-600'} ${link.url ? 'hover:border-slate-300' : 'cursor-not-allowed opacity-60'}`}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default DeathListPage;
