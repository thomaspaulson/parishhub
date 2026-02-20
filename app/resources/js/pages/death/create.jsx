import React, { useState } from 'react';

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

const fieldLabels = {
    date: 'Record date',
    full_name: 'Full name',
    parent: 'Parent',
    address: 'Address',
    spouse: 'Spouse',
    date_of_death: 'Date of death',
    cause_of_death: 'Cause of death',
    place_of_burial: 'Place of burial',
    date_of_burial: 'Date of burial',
    reg_no: 'Registry number',
    page_no: 'Page number',
    book_no: 'Book number'
};

const requiredFields = new Set([
    'date',
    'full_name',
    'parent',
    'address',
    'date_of_death',
    'place_of_burial',
    'date_of_burial',
    'reg_no'
]);

export function DeathCreatePage() {
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
            const response = await fetch('/api/deaths', {
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
                throw new Error('Unable to save the death record.');
            }

            resetForm();
            setSuccessMessage('Death record created successfully.');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">Add death record</h2>
                <p className="mt-1 text-sm text-slate-500">Capture details for the parish death register.</p>
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

            <form className="grid grid-cols-2 lg:grid-cols-3 gap-4 rounded-3xl border border-slate-200 bg-white p-6" onSubmit={handleSubmit}>
                {Object.entries(fieldLabels).map(([field, label]) => {
                    const isDate = field.includes('date');
                    const isRequired = requiredFields.has(field);
                    return (
                        <label key={field} className="block text-sm text-slate-600">
                            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                {label}
                                {isRequired && <span className="text-rose-500">*</span>}
                            </span>
                            <input
                                type={isDate ? 'date' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                                placeholder={label}
                                required={isRequired}
                            />
                            {formErrors[field] && (
                                <span className="mt-1 block text-xs text-rose-500">
                                    {formErrors[field][0]}
                                </span>
                            )}
                        </label>
                    );
                })}

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

export default DeathCreatePage;
