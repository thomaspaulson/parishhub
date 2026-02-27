import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

const emptyForm = {
    name: '',
    email: '',
    password: '',
    is_admin: false
};

export function UserEditPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState({ ...emptyForm });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadUser = async () => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                const response = await api.get(`/api/users/${id}`);
                const { data } = response.data;
                if (isMounted) {
                    setFormData({
                        name: data?.name ?? '',
                        email: data?.email ?? '',
                        password: '',
                        is_admin: Boolean(data?.is_admin)
                    });
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (id) {
            loadUser();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    const userTitle = useMemo(() => (id ? `Editing user #${id}` : 'Edit user'), [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage('');
        setSuccessMessage('');
        setFormErrors({});

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                is_admin: formData.is_admin
            };
            if (formData.password) {
                payload.password = formData.password;
            }
            await api.put(`/api/users/${id}`, payload);
            setSuccessMessage('User updated successfully.');
        } catch (error) {
            const status = error?.response?.status;
            const errors = error?.response?.data?.errors;
            if (status === 422) {
                setFormErrors(errors ?? {});
            }
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">{userTitle}</h2>
                <p className="mt-1 text-sm text-slate-500">Update user profile and access level.</p>
            </header>

            {errorMessage && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {successMessage}
                </div>
            )}

            {isLoading ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
                    Loading user...
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Name
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Full name"
                                required
                            />
                            {formErrors['name'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['name'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Email
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="name@example.com"
                                required
                            />
                            {formErrors['email'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['email'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                New password
                            </span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Leave blank to keep current password"
                            />
                            {formErrors['password'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['password'][0]}
                                </span>
                            )}
                        </label>

                        <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin access</span>
                            <input
                                type="checkbox"
                                name="is_admin"
                                checked={formData.is_admin}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                        </label>
                        {formErrors['is_admin'] && (
                            <span className="col-span-full text-xs text-rose-500">
                                {formErrors['is_admin'][0]}
                            </span>
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : 'Save changes'}
                        </button>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            disabled={isSaving}
                        >
                            Back
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
}

export default UserEditPage;
