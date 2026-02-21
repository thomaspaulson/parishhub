import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const emptyForm = {
    date: '',
    full_name: '',
    parent: '',
    address: '',
    spouse: '',
    date_of_death: '',
    cause_of_death: '',
    place_of_burial: '',
    date_of_burial: '',
    reg_no: '',
    page_no: '',
    book_no: ''
};

export function DeathEditPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState({ ...emptyForm });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadRecord = async () => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                const response = await fetch(`/api/deaths/${id}`, {
                    headers: {
                        Accept: 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Unable to load death record.');
                }

                const payload = await response.json();
                if (!isMounted) {
                    return;
                }

                const record = payload.data ?? payload;
                setFormData({
                    date: record.date ?? '',
                    full_name: record.full_name ?? '',
                    parent: record.parent ?? '',
                    address: record.address ?? '',
                    spouse: record.spouse ?? '',
                    date_of_death: record.date_of_death ?? '',
                    cause_of_death: record.cause_of_death ?? '',
                    place_of_burial: record.place_of_burial ?? '',
                    date_of_burial: record.date_of_burial ?? '',
                    reg_no: record.reg_no ?? '',
                    page_no: record.page_no ?? '',
                    book_no: record.book_no ?? ''
                });
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
            loadRecord();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    const recordTitle = useMemo(() => (id ? `Editing record #${id}` : 'Edit record'), [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage('');
        setSuccessMessage('');
        setFormErrors({});

        try {
            const response = await fetch(`/api/deaths/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 422) {
                const payload = await response.json();
                setFormErrors(payload.errors ?? {});
                return;
            }

            if (!response.ok) {
                throw new Error('Unable to update the death record.');
            }

            setSuccessMessage('Death record updated successfully.');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">{recordTitle}</h2>
                <p className="mt-1 text-sm text-slate-500">Update the Death record details.</p>
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
                    Loading record...
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="col-span-2 lg:col-span-3">
                            <label className="float-right block text-sm text-slate-600">
                                <span className="gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 mx-2">
                                    Date
                                    <span className="text-rose-500">*</span>
                                </span>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="mt-2  rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                    placeholder="Record date"
                                    required={true}
                                />
                                {formErrors['date'] && (
                                    <span className="mt-1 block text-xs text-rose-500">
                                        {formErrors['date'][0]}
                                    </span>
                                )}
                            </label>
                        </div>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Name
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Name"
                                required={true}
                            />
                            {formErrors['full_name'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['full_name'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Parent
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="parent"
                                value={formData.parent}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Parent"
                                required={true}
                            />
                            {formErrors['parent'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['parent'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Address
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Address"
                                required={true}
                            />
                            {formErrors['address'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['address'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Spouse
                            </span>
                            <input
                                type="text"
                                name="spouse"
                                value={formData.spouse}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Spouse"
                            />
                            {formErrors['spouse'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['spouse'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Date of death
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="date"
                                name="date_of_death"
                                value={formData.date_of_death}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Date of death"
                                required={true}
                            />
                            {formErrors['date_of_death'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['date_of_death'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Cause of death
                            </span>
                            <input
                                type="text"
                                name="cause_of_death"
                                value={formData.cause_of_death}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Cause of death"
                            />
                            {formErrors['cause_of_death'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['cause_of_death'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Place of burial
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="place_of_burial"
                                value={formData.place_of_burial}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Place of burial"
                                required={true}
                            />
                            {formErrors['place_of_burial'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['place_of_burial'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Date of burial
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="date"
                                name="date_of_burial"
                                value={formData.date_of_burial}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Date of burial"
                                required={true}
                            />
                            {formErrors['date_of_burial'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['date_of_burial'][0]}
                                </span>
                            )}
                        </label>

                        <div className="col-span-full">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <label className="block text-sm text-slate-600">
                                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Reg No
                                        <span className="text-rose-500">*</span>
                                    </span>
                                    <input
                                        type="text"
                                        name="reg_no"
                                        value={formData.reg_no}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Reg No"
                                        required={true}
                                    />
                                    {formErrors['reg_no'] && (
                                        <span className="mt-1 block text-xs text-rose-500">
                                            {formErrors['reg_no'][0]}
                                        </span>
                                    )}
                                </label>
                                <label className="block text-sm text-slate-600">
                                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Page No
                                    </span>
                                    <input
                                        type="text"
                                        name="page_no"
                                        value={formData.page_no}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Page No"
                                    />
                                    {formErrors['page_no'] && (
                                        <span className="mt-1 block text-xs text-rose-500">
                                            {formErrors['page_no'][0]}
                                        </span>
                                    )}
                                </label>
                                <label className="block text-sm text-slate-600">
                                    <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Book No
                                    </span>
                                    <input
                                        type="text"
                                        name="book_no"
                                        value={formData.book_no}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Book No"
                                    />
                                    {formErrors['book_no'] && (
                                        <span className="mt-1 block text-xs text-rose-500">
                                            {formErrors['book_no'][0]}
                                        </span>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                type="submit"
                                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Update record'}
                            </button>
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                disabled={isSaving}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </section>
    );
}

export default DeathEditPage;
