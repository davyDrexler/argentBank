import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Modal from '../../components/Modal_change_name';

function UserPage() {
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                console.log('Profile response:', response);

                if (response.ok) {
                    const data = await response.json();
                    console.log('User data:', data);
                    setUserData(data.body);
                } else {
                    const errorData = await response.json();
                    console.error('Aucune data de user trouvé', errorData);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchUserData();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!userData) {
        return <div>Oh ce n'est pas normal d'etre ici <Link to="/">Retourner a l'accueil</Link> </div>
    }

    return (
        <div className='userpage'>
            <div className='top-text'>
                <h1>Welcome back
                    <br/>
                    {userData.firstName} {userData.lastName}
                </h1>
            </div>
            <div className='button' onClick={openModal}>
                <button>Ouvrir la Modal</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Modal Title</h2>
                <p>This is the modal content.</p>
            </Modal>
        </div>
    );
}

export default UserPage;
