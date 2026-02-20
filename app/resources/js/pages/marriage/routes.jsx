import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MarriageCreatePage } from './create';
import { MarriageEditPage } from './edit';
import { MarriageListPage } from './index';

const MarriageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MarriageListPage />} />
            <Route path="/create" element={<MarriageCreatePage />} />
            <Route path="/:id/edit" element={<MarriageEditPage />} />
        </Routes>
    );
};

export default MarriageRoutes;
