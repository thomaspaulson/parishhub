import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { navItems } from './data';

const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${isActive
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

export function PublicLayout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
                <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-semibold text-white">
                            PH
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">ParishHub</p>
                            <p className="text-lg font-semibold text-slate-900">Record Registry</p>
                        </div>
                    </div>
                    <div className="hidden items-center gap-3 md:flex">
                        {navItems.map((item) => (
                            <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
                                {item.label}
                            </NavLink>
                        ))}
                        <NavLink
                            className="rounded-full border border-indigo-200 px-4 py-2 text-sm text-indigo-700 transition hover:border-indigo-300 hover:text-indigo-800"
                            to="/admin"
                        >
                            Admin
                        </NavLink>
                    </div>
                </nav>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="border-t border-slate-200 py-10">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
                    <p>© 2026 ParishHub. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-slate-900" href="#">
                            Privacy
                        </a>
                        <a className="hover:text-slate-900" href="#">
                            Terms
                        </a>
                        <a className="hover:text-slate-900" href="#">
                            Support
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
