import React, { useState } from 'react';

const emptyForm = {
    date: '',
    bride_full_name: '',
    bride_parents: '',
    groom_full_name: '',
    groom_parents: '',
    celebrant: '',
    church: '',
    married_on: '',
    witness1: '',
    witness2: '',
    reg_no: '',
    page_no: '',
    book_no: ''
};

export function MarriageCreatePage() {
    const [formData, setFormData] = useState({ ...emptyForm });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ ...emptyForm });
        setFormErrors({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage('');
        setSuccessMessage('');
        setFormErrors({});

        try {
            const response = await fetch('/api/marriages', {
                method: 'POST',
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
                throw new Error('Unable to save the marriage record.');
            }

            resetForm();
            setSuccessMessage('Marriage record created successfully.');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">Add marriage record</h2>
                <p className="mt-1 text-sm text-slate-500">Capture details for the parish marriage register.</p>
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
                            Bride
                            <span className="text-rose-500">*</span>
                        </span>
                        <input
                            type="text"
                            name="bride_full_name"
                            value={formData.bride_full_name}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                            placeholder="Bride full name"
                            required={true}
                        />
                        {formErrors['bride_full_name'] && (
                            <span className="mt-1 block text-xs text-rose-500">
                                {formErrors['bride_full_name'][0]}
                            </span>
                        )}
                    </label>

                    <div className="col-span-1 lg:col-span-2">
                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Bride parents
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="bride_parents"
                                value={formData.bride_parents}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Bride parents"
                                required={true}
                            />
                            {formErrors['bride_parents'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['bride_parents'][0]}
                                </span>
                            )}
                        </label>
                    </div>

                    <label className="block text-sm text-slate-600">
                        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Groom
                            <span className="text-rose-500">*</span>
                        </span>
                        <input
                            type="text"
                            name="groom_full_name"
                            value={formData.groom_full_name}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                            placeholder="Groom full name"
                            required={true}
                        />
                        {formErrors['groom_full_name'] && (
                            <span className="mt-1 block text-xs text-rose-500">
                                {formErrors['groom_full_name'][0]}
                            </span>
                        )}
                    </label>

                    <div className="col-span-1 lg:col-span-2">
                        <label className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Groom parents
                                <span className="text-rose-500">*</span>
                            </span>
                            <input
                                type="text"
                                name="groom_parents"
                                value={formData.groom_parents}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder="Groom parents"
                                required={true}
                            />
                            {formErrors['groom_parents'] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors['groom_parents'][0]}
                                </span>
                            )}
                        </label>
                    </div>

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
                            Church
                            <span className="text-rose-500">*</span>
                        </span>
                        <input
                            type="text"
                            name="church"
                            value={formData.church}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                            placeholder="Church"
                            required={true}
                        />
                        {formErrors['church'] && (
                            <span className="mt-1 block text-xs text-rose-500">
                                {formErrors['church'][0]}
                            </span>
                        )}
                    </label>

                    <label className="block text-sm text-slate-600">
                        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Marriage date
                            <span className="text-rose-500">*</span>
                        </span>
                        <input
                            type="date"
                            name="married_on"
                            value={formData.married_on}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                            placeholder="Marriage date"
                            required={true}
                        />
                        {formErrors['married_on'] && (
                            <span className="mt-1 block text-xs text-rose-500">
                                {formErrors['married_on'][0]}
                            </span>
                        )}
                    </label>

                    <label className="block text-sm text-slate-600">
                        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Witness 1
                        </span>
                        <input
                            type="text"
                            name="witness1"
                            value={formData.witness1}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                            placeholder="Witness 1"
                        />
                        {formErrors['witness1'] && (
                            <span className="mt-1 block text-xs text-rose-500">
                                {formErrors['witness1'][0]}
                            </span>
                        )}
                    </label>

                    <label className="block text-sm text-slate-600">
                        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Witness 2
                        </span>
                        <input
                            type="text"
                            name="witness2"
                            value={formData.witness2}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                            placeholder="Witness 2"
                        />
                        {formErrors['witness2'] && (
                            <span className="mt-1 block text-xs text-rose-500">
                                {formErrors['witness2'][0]}
                            </span>
                        )}
                    </label>

                    <div className="col-span-full">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <label className="block text-sm text-slate-600">
                                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Registry number
                                    <span className="text-rose-500">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="reg_no"
                                    value={formData.reg_no}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                    placeholder="Registry number"
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
                                    Page number
                                </span>
                                <input
                                    type="text"
                                    name="page_no"
                                    value={formData.page_no}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                    placeholder="Page number"
                                />
                                {formErrors['page_no'] && (
                                    <span className="mt-1 block text-xs text-rose-500">
                                        {formErrors['page_no'][0]}
                                    </span>
                                )}
                            </label>

                            <label className="block text-sm text-slate-600">
                                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Book number
                                </span>
                                <input
                                    type="text"
                                    name="book_no"
                                    value={formData.book_no}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                    placeholder="Book number"
                                />
                                {formErrors['book_no'] && (
                                    <span className="mt-1 block text-xs text-rose-500">
                                        {formErrors['book_no'][0]}
                                    </span>
                                )}
                            </label>
                        </div>
                    </div>

                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                        type="submit"
                        className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Create record'}
                    </button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900"
                        disabled={isSaving}
                    >
                        Clear form
                    </button>
                </div>
            </form>
        </section>
    );
}

export default MarriageCreatePage;
