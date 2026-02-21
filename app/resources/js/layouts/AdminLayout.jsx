import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { adminNavItems } from './data';
import api from '../api/axios';

const adminNavLinkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-600 hover:bg-slate-100'
    }`;

export function AdminLayout() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user on app start
    useEffect(() => {
        api.get('/api/user')
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    async function handleLogout() {
        try {
            await api.post('/api/auth/logout');
            localStorage.removeItem('auth_token');
            setUser(null)
            window.location.href = '/login';
        } catch (error) {
            //
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="flex min-h-screen">
                <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 md:flex">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-semibold text-white">
                            PH
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">Admin</p>
                            <p className="text-lg font-semibold text-slate-900">Control Center</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {adminNavItems.map((item) => (
                            <NavLink key={item.to} to={item.to} className={adminNavLinkClass} end={item.to === '/admin'}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                        Signed in as <span className="font-semibold text-slate-900">{user?.name}</span>.
                    </div>
                </aside>

                <div className="flex flex-1 flex-col">
                    <header className="border-b border-slate-200 bg-white px-6 py-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Admin Portal</p>
                                <h1 className="text-xl font-semibold text-slate-900">ParishHub Operations</h1>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="rounded-full border border-indigo-200 px-4 py-2 text-sm text-indigo-700"
                            >
                                Logout
                            </button>
                            {/* <NavLink className="rounded-full border border-indigo-200 px-4 py-2 text-sm text-indigo-700" to="/">
                                View public site
                            </NavLink> */}
                        </div>
                    </header>
                    <main className="flex-1 px-6 py-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
