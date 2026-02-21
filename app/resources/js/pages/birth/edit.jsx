import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const emptyForm = {
    date: '',
    full_name: '',
    father_name: '',
    mother_name: '',
    date_of_birth: '',
    date_of_baptism: '',
    place_of_baptism: '',
    celebrant: '',
    god_parents: '',
    parish: '',
    reg_no: '',
    page_no: '',
    book_no: ''
};


export function BirthEditPage() {
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
                const response = await fetch(`/api/births/${id}`, {
                    headers: {
                        Accept: 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Unable to load Birth record.');
                }

                const payload = await response.json();
                if (!isMounted) {
                    return;
                }

                const record = payload.data ?? payload;
                setFormData(record);
                // setFormData({
                //     date: record.date ?? '',
                //     full_name: record.full_name ?? '',
                //     parent: record.parent ?? '',
                //     address: record.address ?? '',
                //     spouse: record.spouse ?? '',
                //     date_of_Birth: record.date_of_Birth ?? '',
                //     cause_of_Birth: record.cause_of_Birth ?? '',
                //     place_of_burial: record.place_of_burial ?? '',
                //     date_of_burial: record.date_of_burial ?? '',
                //     reg_no: record.reg_no ?? '',
                //     page_no: record.page_no ?? '',
                //     book_no: record.book_no ?? ''
                // });
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
            const response = await fetch(`/api/births/${id}`, {
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
                throw new Error('Unable to update the Birth record.');
            }

            setSuccessMessage('Birth record updated successfully.');
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
                <p className="mt-1 text-sm text-slate-500">Update the Birth record details.</p>
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
                                Father
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Father"
                                required={true}
                            />
                            {formErrors['father_name'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['father_name'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Mother
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="mother_name"
                                value={formData.mother_name}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Mother"
                                required={true}
                            />
                            {formErrors['mother_name'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['mother_name'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Date of Birth
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Date of Birth"
                                required={true}
                            />
                            {formErrors['date_of_birth'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['date_of_birth'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Date of Baptism
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="date"
                                name="date_of_baptism"
                                value={formData.date_of_baptism}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Date of Baptism"
                                required={true}
                            />
                            {formErrors['date_of_baptism'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['date_of_baptism'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Place of Baptism
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="place_of_baptism"
                                value={formData.place_of_baptism}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Place of Baptism"
                                required={true}
                            />
                            {formErrors['place_of_baptism'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['place_of_baptism'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Celebrant
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="celebrant"
                                value={formData.celebrant}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Celebrant"
                                required={true}
                            />
                            {formErrors['celebrant'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['celebrant'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                God parents
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="god_parents"
                                value={formData.god_parents}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="God parents"
                                required={true}
                            />
                            {formErrors['god_parents'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['god_parents'][0]}
                                </span>
                            )}
                        </label>

                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Parish
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="parish"
                                value={formData.parish}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Parish"
                                required={true}
                            />
                            {formErrors['parish'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['parish'][0]}
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
                                        <span className="text-rose-500">*</span>
                                    </span>
                                    <input
                                        type="text"
                                        name="page_no"
                                        value={formData.page_no}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Page No"
                                        required={true}
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
                                        <span className="text-rose-500">*</span>
                                    </span>
                                    <input
                                        type="text"
                                        name="book_no"
                                        value={formData.book_no}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                        placeholder="Book No"
                                        required={true}
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

export default BirthEditPage;
