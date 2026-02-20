import React, { useState } from 'react';

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

const fieldLabels = {
    date: 'Date',
    full_name: 'Full name',
    father_name: 'Father',
    mother_name: 'Mother',
    spouse: 'Spouse',
    date_of_birth: 'Date of Birth',
    date_of_baptism: 'Date of Baptism',
    place_of_baptism: 'Place of Baptism',
    celebrant: 'Celebrant',
    god_parents: 'God Parents',
    parish: 'Parish',
    reg_no: 'Registry No',
    page_no: 'Page No',
    book_no: 'Book No'
};

const requiredFields = new Set([
    'date',
    'full_name',
    'parent',
    'address',
    'date_of_Birth',
    'place_of_burial',
    'date_of_burial',
    'reg_no'
]);

export function BirthCreatePage() {
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
            const response = await fetch('/api/births', {
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
                throw new Error('Unable to save the Birth record.');
            }

            resetForm();
            setSuccessMessage('Birth record created successfully.');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unexpected error.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">Add Birth record</h2>
                <p className="mt-1 text-sm text-slate-500">Capture details for the parish Birth register.</p>
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
                    <div className="col-span-full flex flex-wrap items-center gap-3 pt-2">
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
                </div>
            </form>
        </section>
    );
}

export default BirthCreatePage;
