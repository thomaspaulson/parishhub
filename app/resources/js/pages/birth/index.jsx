import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export function BirthListPage() {
    const [births, setBirths] = useState([]);
    const [meta, setMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const loadBirths = useCallback(async ({ url, search = searchQuery } = {}) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const requestUrl = url ?? (() => {
                const params = new URLSearchParams({ per_page: '15' });
                if (search) {
                    params.set('q', search);
                }
                return `/api/births?${params.toString()}`;
            })();

            const response = await api.get(requestUrl);
            const { data, meta } = response.data;
            setBirths(data ?? []);
            setMeta(meta ?? null);

        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        loadBirths();
    }, [loadBirths]);

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
            const response = await fetch(`/api/births/${recordId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Unable to delete the Birth record.');
            }

            await loadBirths();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setDeletingId(null);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const trimmed = searchTerm.trim();
        setSearchQuery(trimmed);
        loadBirths({ search: trimmed });
    };

    const handleSearchClear = () => {
        setSearchTerm('');
        setSearchQuery('');
        loadBirths({ search: '' });
    };

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <header>
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">Birth records</h2>
                        {totalLabel && <p className="mt-1 text-sm text-slate-500">{totalLabel}</p>}
                        {searchQuery && (
                            <p className="mt-1 text-xs text-slate-400">
                                Showing results for <span className="font-semibold text-slate-600">"{searchQuery}"</span>
                            </p>
                        )}
                    </div>
                </header>

                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        to="/admin/births/create"
                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Add record
                    </Link>
                    <button
                        type="button"
                        onClick={() => loadBirths()}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <div className="flex min-w-[220px] flex-1 items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Search</span>
                    <input
                        type="search"
                        name="q"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Name, date of birth, registry..."
                        className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="submit"
                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={handleSearchClear}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
                        disabled={!searchTerm && !searchQuery}
                    >
                        Clear
                    </button>
                </div>
            </form>

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
                            <th className="px-4 py-3">Date of Birth</th>
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
                        ) : births.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                                    No Birth records yet.
                                </td>
                            </tr>
                        ) : (
                            births.map((record) => (
                                <tr key={record.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-4">
                                        <div className="font-semibold text-slate-900">{record.full_name}</div>
                                        <div className="text-xs text-slate-500">{record.address}</div>
                                    </td>
                                    <td className="px-4 py-4 text-slate-700">{record.date_of_Birth}</td>
                                    <td className="px-4 py-4 text-slate-700">{record.place_of_burial}</td>
                                    <td className="px-4 py-4 text-slate-700">
                                        {record.reg_no}
                                        {record.page_no ? ` · p.${record.page_no}` : ''}
                                        {record.book_no ? ` · b.${record.book_no}` : ''}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                to={`/admin/births/${record.id}/edit`}
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
                            onClick={() => link.url && loadBirths({ url: link.url })}
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

export default BirthListPage;
