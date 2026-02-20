import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminRegistriesPage } from '../pages/AdminRegistriesPage';
import { AdminReportsPage } from '../pages/AdminReportsPage';
import { AdminSettingsPage } from '../pages/AdminSettingsPage';
import { AdminTeamPage } from '../pages/AdminTeamPage';
import { HomePage } from '../pages/HomePage';
import { InsightsPage } from '../pages/InsightsPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RecordsPage } from '../pages/RecordsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { WorkflowPage } from '../pages/WorkflowPage';
import DeathRoutes from '../pages/death/routes';
import BirthRoutes from '../pages/birth/routes';
import MarriageRoutes from '../pages/marriage/routes';
import { ProtectedRoute } from './ProtectedRoute';


export const appRouter = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/records', element: <RecordsPage /> },
            { path: '/workflow', element: <WorkflowPage /> },
            { path: '/insights', element: <InsightsPage /> },
            { path: '/settings', element: <SettingsPage /> }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    { index: true, element: <DashboardPage /> },
                    { path: 'deaths/*', element: <DeathRoutes /> },
                    { path: 'births/*', element: <BirthRoutes /> },
                    { path: 'marriages/*', element: <MarriageRoutes /> },
                    { path: 'registries', element: <AdminRegistriesPage /> },
                    { path: 'team', element: <AdminTeamPage /> },
                    { path: 'reports', element: <AdminReportsPage /> },
                    { path: 'settings', element: <AdminSettingsPage /> }
                ]
            }
        ]
    },
    { path: '*', element: <NotFoundPage /> }
]);
