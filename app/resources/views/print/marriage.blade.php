@extends('layouts.print')

@section('content')
                    <div class="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-6">
                        <div class="space-y-2">
                            <h1 class="text-3xl font-semibold">Marriage Record Certificate</h1>
                            <p class="text-sm text-slate-600">
                                Issued on {{ now()->format('F j, Y') }}
                            </p>
                        </div>
                        <div class="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm">
                            <div class="text-xs uppercase tracking-wide text-slate-600">Registry No.</div>
                            <div class="text-lg font-semibold text-slate-900">
                                {{ $record->reg_no ?? '—' }}
                            </div>
                            <div class="text-xs text-slate-600">
                                Page {{ $record->page_no ?? '—' }} · Book {{ $record->book_no ?? '—' }}
                            </div>
                        </div>
                    </div>

                </header>

                <section class="mt-8 grid gap-6 md:grid-cols-2">
                    <div class="space-y-4">
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Bride</p>
                            <p class="text-xl font-semibold text-slate-900">
                                {{ $record->bride_full_name ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Bride Parents</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->bride_parents ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Groom</p>
                            <p class="text-xl font-semibold text-slate-900">
                                {{ $record->groom_full_name ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Groom Parents</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->groom_parents ?? '—' }}
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-500">Married On</p>
                                <p class="text-sm font-medium text-slate-800">
                                    {{ $record->married_on ?? '—' }}
                                </p>
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-500">Recorded On</p>
                                <p class="text-sm font-medium text-slate-800">
                                    {{ $record->date ?? '—' }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Celebrant</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->celebrant ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Church</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->church ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Witnesses</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->witness1 ?? '—' }}{{ $record->witness2 ? ' · ' . $record->witness2 : '' }}
                            </p>
                        </div>
                    </div>
                </section>

@endsection
