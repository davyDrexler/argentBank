import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Rediriger vers la page de connexion si aucun token
        return <Navigate to="/login" />;
    }

    // Si token -> afficher userpage
    return children;
};

export default ProtectedRoute;
