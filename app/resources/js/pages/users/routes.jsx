import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserCreatePage } from './create';
import { UserEditPage } from './edit';
import { UserListPage } from './index';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/create" element={<UserCreatePage />} />
            <Route path="/:id/edit" element={<UserEditPage />} />
        </Routes>
    );
};

export default UserRoutes;