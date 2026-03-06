<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{{ config('app.name', 'ParishHub') }}: Marriage Record</title>

        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        @vite('resources/css/app.css')
        <style>
            @page {
                size: A4;
                margin: 20mm;
            }

            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            }
        </style>
    </head>
    <body class="antialiased bg-slate-100 text-slate-900">
        <div id="app" class="min-h-screen py-10">
            <div class="mx-auto w-full max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
                <header class="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-6">
                    <div class="space-y-2">
                        <p class="text-xs uppercase tracking-[0.35em] text-indigo-500">Diocese of Cochin</p>
                        <h1 class="text-3xl font-semibold">Marriage Record Certificate</h1>
                        <p class="text-sm text-slate-500">
                            Issued on {{ now()->format('F j, Y') }} by St.Joseph's Bethlehem Church, Chullikal.<br>
                        </p>
                    </div>
                    <div class="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm">
                        <div class="text-xs uppercase tracking-wide text-slate-400">Registry No.</div>
                        <div class="text-lg font-semibold text-slate-900">
                            {{ $record->reg_no ?? '—' }}
                        </div>
                        <div class="text-xs text-slate-500">
                            Page {{ $record->page_no ?? '—' }} · Book {{ $record->book_no ?? '—' }}
                        </div>
                    </div>
                </header>

                <section class="mt-8 grid gap-6 md:grid-cols-2">
                    <div class="space-y-4">
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">Bride</p>
                            <p class="text-xl font-semibold text-slate-900">
                                {{ $record->bride_full_name ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">Bride Parents</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->bride_parents ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">Groom</p>
                            <p class="text-xl font-semibold text-slate-900">
                                {{ $record->groom_full_name ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">Groom Parents</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->groom_parents ?? '—' }}
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-400">Married On</p>
                                <p class="text-sm font-medium text-slate-800">
                                    {{ $record->married_on ?? '—' }}
                                </p>
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-400">Recorded On</p>
                                <p class="text-sm font-medium text-slate-800">
                                    {{ $record->date ?? '—' }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">Celebrant</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->celebrant ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">Church</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->church ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-400">Witnesses</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->witness1 ?? '—' }}{{ $record->witness2 ? ' · ' . $record->witness2 : '' }}
                            </p>
                        </div>
                    </div>
                </section>

                <section class="mt-8">
                    <div class="rounded-2xl border border-slate-200 p-5">
                        <p class="text-xs uppercase tracking-wide text-slate-400">Additional Notes</p>
                        <p class="mt-2 text-sm text-slate-600">
                            This certificate is generated from the official parish registry.
                        </p>
                    </div>
                </section>

                <section class="mt-10 grid gap-8 md:grid-cols-2">
                    <div class="space-y-3">
                        <p class="text-xs uppercase tracking-wide text-slate-400">Prepared By</p>
                        <div class="h-12 border-b border-slate-300"></div>
                        <p class="text-sm text-slate-500">Registry Officer</p>
                    </div>
                    <div class="space-y-3 md:text-right">
                        <p class="text-xs uppercase tracking-wide text-slate-400">Approved By</p>
                        <div class="h-12 border-b border-slate-300"></div>
                        <p class="text-sm text-slate-500">Parish Priest</p>
                    </div>
                </section>
            </div>
        </div>
    </body>
</html>
