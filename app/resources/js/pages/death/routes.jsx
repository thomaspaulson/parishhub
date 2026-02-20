import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DeathCreatePage } from './create';
import { DeathEditPage } from './edit';
import { DeathListPage } from './index';

// export const deathRoutes = [
// 	{ path: '/', element: <DeathListPage /> },
// 	{ path: '/create', element: <DeathCreatePage /> },
// 	{ path: '/:id/edit', element: <DeathEditPage /> }
// ];

const DeathRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DeathListPage />} />
            <Route path="/create" element={<DeathCreatePage />} />
            <Route path="/:id/edit" element={<DeathEditPage />} />
        </Routes>
    );
};

export default DeathRoutes;
