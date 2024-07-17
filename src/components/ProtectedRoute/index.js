import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Rediriger vers la page de connexion si le token n'est pas présent
        return <Navigate to="/login" />;
    }

    // Si le token est présent, afficher le contenu protégé
    return children;
};

export default ProtectedRoute;
