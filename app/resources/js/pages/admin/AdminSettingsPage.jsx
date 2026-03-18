import React, { useState } from 'react';
import api from '../../api/axios';

export function AdminSettingsPage() {
    const [downloadingType, setDownloadingType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const downloadTemplate = async (type, endpoint, fallbackFilename) => {
        setDownloadingType(type);
        setErrorMessage('');

        try {
            const response = await api.get(endpoint, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            const contentDisposition = response.headers?.['content-disposition'] ?? '';
            const filenameMatch = contentDisposition.match(/filename="?([^\"]+)"?/i);
            const filename = filenameMatch?.[1] || fallbackFilename;

            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unable to download the CSV template.');
        } finally {
            setDownloadingType('');
        }
    };


    const downloadBackup = async () => {
        setDownloadingType('backup');
        setErrorMessage('');

        try {
            const response = await api.get('/api/backup/full', {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            const contentDisposition = response.headers?.['content-disposition'] ?? '';
            const filenameMatch = contentDisposition.match(/filename="?([^\"]+)"?/i);
            const filename = filenameMatch?.[1] || `parishhub-backup-${new Date().toISOString().slice(0, 10)}.zip`;

            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Unable to download the backup file.');
        } finally {
            setDownloadingType('');
        }
    };

    return (
        <section className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-2xl font-semibold text-slate-900">Settings</h2>

                {errorMessage && (
                    <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {errorMessage}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="text-lg font-semibold text-slate-900">Download Template files</h3>
                        <p className="mt-3 text-sm text-slate-600">
                            Download the CSV template to ensure your data is formatted correctly for bulk uploads.
                        </p>
                        <div className="mt-4 grid gap-6 md:grid-cols-3">
                            <button
                                type="button"
                                onClick={() => downloadTemplate('birth', '/api/births/download-csv', 'births-template.csv')}
                                disabled={downloadingType !== ''}
                                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {downloadingType === 'birth' ? 'Downloading...' : 'Download Birth Template file'}
                            </button>
                            <button
                                type="button"
                                onClick={() => downloadTemplate('death', '/api/deaths/download-csv', 'deaths-template.csv')}
                                disabled={downloadingType !== ''}
                                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {downloadingType === 'death' ? 'Downloading...' : 'Download Death Template file'}
                            </button>
                            <button
                                type="button"
                                onClick={() => downloadTemplate('marriage', '/api/marriages/download-csv', 'marriages-template.csv')}
                                disabled={downloadingType !== ''}
                                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {downloadingType === 'marriage' ? 'Downloading...' : 'Download Marriage Template file'}
                            </button>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h3 className="text-lg font-semibold text-slate-900">Backup</h3>
                        <p className="mt-3 text-sm text-slate-600">
                            Download a backup of all your data in a single ZIP file. This includes all records and associated media.
                        </p>
                        <button
                            type="button"
                            onClick={downloadBackup}
                            disabled={downloadingType !== ''}
                            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {downloadingType === 'backup' ? 'Downloading...' : 'Download Backup'}
                        </button>

                    </div>

                </div>
            </div>
        </section>
    );
}
