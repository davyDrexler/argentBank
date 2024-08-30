import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            console.log('Response received:', response);

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Récupération du token
                if (data.body && data.body.token) {
                    setToken(data.body.token);
                    // Stockage du token dans le localstorage
                    localStorage.setItem('token', data.body.token);
                    // affiche le token dans la console 
                    console.log('Token:', data.body.token);

                    // Redirige vers la page userpage après une connexion réussie
                    navigate('/userpage');
                } else {
                    console.log('Aucun token trouvé');
                }
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);

                // Vérification de l'erreur 400 et affichage d'une alerte si besoin
                if (response.status === 400) {
                    window.alert('Erreur 400: Email ou mot de passe incorrect.');
                } else if (response.status === 500) {
                    window.alert(`Erreur: ${errorData.message || 'Erreur 500: Connexion au serveur impossible'}`);
                } else {
                    window.alert(`Erreur: ${errorData.message || 'Une erreur est survenue lors de la connexion.'}`);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            window.alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div className="white-square">
            <div className="user-icon">
                <FontAwesomeIcon className="iconLogin" icon={faCircleUser} />
                <h1 className="title">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
