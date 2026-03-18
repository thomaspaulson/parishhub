<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{{ $title ?? config('app.name', 'ParishHub')}}</title>

        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:500,500,600" rel="stylesheet" />
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
                <header>
                    <div class="flex flex-wrap items-center justify-center mb-4 pb-4 text-center">
                        <div class="flex h-32 w-32 items-center justify-center overflow-hidden">
                            <img
                                src="{{ asset('images/logo.png') }}"
                                alt="Parish logo"
                                class="h-full w-full object-contain p-2"
                            />
                        </div>
                        <div class="space-y-1 mt-2">
                            <h1 class="text-3xl">Roman Catholic Diocese of Cochin</h1>
                            <h2 class="text-2xl text-slate-900">
                                St. Joseph's Bethlehem Church
                            </h2>
                            <p class="text-md">Chullikal, Kochi, Kerala, India - 682005</p>
                        </div>
                    </div>

                @yield('content')

                <section class="mt-8">
                    <div class="rounded-2xl border border-slate-200 p-5">
                        <p class="text-xs uppercase tracking-wide text-slate-500">Additional Notes</p>
                        <p class="mt-2 text-sm text-slate-600">
                            This certificate is generated from the official parish registry.
                        </p>
                    </div>
                </section>

                <section class="mt-10 grid gap-8 md:grid-cols-2">
                    <div class="space-y-3">
                        <p class="text-xs uppercase tracking-wide text-slate-500">Prepared By</p>
                        <div class="h-12 border-b border-slate-300"></div>
                        <p class="text-sm text-slate-600">Registry Officer</p>
                    </div>
                    <div class="space-y-3 md:text-right">
                        <p class="text-xs uppercase tracking-wide text-slate-500">Approved By</p>
                        <div class="h-12 border-b border-slate-300"></div>
                        <p class="text-sm text-slate-600">Parish Priest</p>
                    </div>
                </section>

            </div>
        </div>
    </body>
</html>
