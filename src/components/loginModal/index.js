import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function LoginModal() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Créer un objet avec les informations de connexion
        const loginData = {
            username: username,
            password: password,
        };

        try {
            // Envoyer les informations de connexion à l'API
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            // Vérifier si la requête a réussi
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Gérer la connexion réussie (par exemple, rediriger l'utilisateur)
            } else {
                console.error('Login failed');
                // Gérer l'échec de la connexion (par exemple, afficher un message d'erreur)
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Gérer les erreurs réseau ou autres
        }
    };

    return (
        <div className="white-square">
            <div className="user-icon">
                <FontAwesomeIcon className="iconLogin" icon={faCircleUser} />
                <h1 className="title">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
