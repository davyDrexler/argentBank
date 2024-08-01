import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Modal from '../../components/Modal_change_name';
import BalanceBox from '../../components/Balance'

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
            <div className='button_modal'>
                <div className='button_open_modal_name' onClick={openModal}>
                    <button>Edit Name</button>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                
                </Modal>
            </div>

            <div className='balance'>
                <BalanceBox topText="Argent Bank Checking (x8349)" Money="$2,082.79" botText="Available Balance"/>
                <BalanceBox topText="Argent Bank Checking (x8349)" Money="$2,082.79" botText="Available Balance"/>
                <BalanceBox topText="Argent Bank Checking (x8349)" Money="$2,082.79" botText="Available Balance"/>
            </div>
        </div>
    );
}

export default UserPage;
