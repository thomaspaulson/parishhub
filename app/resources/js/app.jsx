import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './routes/AppRoutes';
import '../css/app.css';

const rootElement = document.getElementById('app');

if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <RouterProvider router={appRouter} />
        </React.StrictMode>
    );
}
