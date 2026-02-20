import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BirthCreatePage } from './create';
import { BirthEditPage } from './edit';
import { BirthListPage } from './index';

const BirthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<BirthListPage />} />
            <Route path="/create" element={<BirthCreatePage />} />
            <Route path="/:id/edit" element={<BirthEditPage />} />
        </Routes>
    );
};

export default BirthRoutes;
