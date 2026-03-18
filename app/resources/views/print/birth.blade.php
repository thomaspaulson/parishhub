@extends('layouts.print')

@section('content')
                    <div class="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-6">
                        <div class="space-y-2">
                            <h1 class="text-3xl font-semibold">Birth Record Certificate</h1>
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
                            <p class="text-xs uppercase tracking-wide text-slate-500">Name</p>
                            <p class="text-xl font-semibold text-slate-900">
                                {{ $record->full_name ?? '—' }}
                            </p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-500">Date of Birth</p>
                                <p class="text-sm font-medium text-slate-800">
                                    {{ $record->date_of_birth ?? '—' }}
                                </p>
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-wide text-slate-500">Date of Baptism</p>
                                <p class="text-sm font-medium text-slate-800">
                                    {{ $record->date_of_baptism ?? '—' }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Place of Baptism</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->place_of_baptism ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Celebrant</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->celebrant ?? '—' }}
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Father</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->father_name ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Mother</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->mother_name ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">God Parents</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->god_parents ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Parish</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->parish ?? '—' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-slate-500">Recorded On</p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ $record->date ?? '—' }}
                            </p>
                        </div>
                    </div>
                </section>

@endsection
