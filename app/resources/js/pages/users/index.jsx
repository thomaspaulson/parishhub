import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export function UserListPage() {
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const loadUsers = useCallback(async ({ url, search = searchQuery } = {}) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const requestUrl = url ?? (() => {
                const params = new URLSearchParams({ per_page: '15' });
                if (search) {
                    params.set('q', search);
                }
                return `/api/users?${params.toString()}`;
            })();

            const response = await api.get(requestUrl);
            const { data, meta } = response.data;
            setUsers(data ?? []);
            setMeta(meta ?? null);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const totalLabel = useMemo(() => {
        if (!meta) {
            return null;
        }

        return `Showing ${meta.from ?? 0}-${meta.to ?? 0} of ${meta.total ?? 0}`;
    }, [meta]);

    const handleDelete = async (userId) => {
        if (!window.confirm('Delete this user?')) {
            return;
        }

        setDeletingId(userId);
        setErrorMessage('');

        try {
            await api.delete(`/api/users/${userId}`);
            await loadUsers();
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
        loadUsers({ search: trimmed });
    };

    const handleSearchClear = () => {
        setSearchTerm('');
        setSearchQuery('');
        loadUsers({ search: '' });
    };

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <header>
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">Users</h2>
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
                        to="/admin/users/create"
                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Add user
                    </Link>
                    <button
                        type="button"
                        onClick={() => loadUsers()}
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
                        placeholder="Name or email"
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
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Created</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                                    Loading users...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                                    No users yet.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-4">
                                        <div className="font-semibold text-slate-900">{user.name}</div>
                                    </td>
                                    <td className="px-4 py-4 text-slate-700">{user.email}</td>
                                    <td className="px-4 py-4 text-slate-700">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.is_admin ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                                            {user.is_admin ? 'Admin' : 'Staff'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-slate-700">{user.created_at ?? '—'}</td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                to={`/admin/users/${user.id}/edit`}
                                                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(user.id)}
                                                className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:border-rose-300"
                                                disabled={deletingId === user.id}
                                            >
                                                {deletingId === user.id ? 'Deleting...' : 'Delete'}
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
                            onClick={() => link.url && loadUsers({ url: link.url })}
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

export default UserListPage;