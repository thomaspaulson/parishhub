import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const getAuthToken = () => localStorage.getItem('auth_token') ?? localStorage.getItem('token');

export const ProtectedRoute = ({ redirectTo = '/login' }) => {
    const location = useLocation();
    const token = getAuthToken();

    if (!token) {
        return <Navigate to={redirectTo} replace state={{ from: location }} />;
    }

    return <Outlet />;
};
