// UserPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import Modal from '../../components/Modal_change_name';
import BalanceBox from '../../components/Balance';
import { updateUserPseudo, setAuthenticated } from '../../features/userSlice';

function UserPage() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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

                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.body.firstName);
                    setLastName(data.body.lastName);
                    dispatch(updateUserPseudo(data.body.userName));
                    dispatch(setAuthenticated(true));
                } else {
                    const errorData = await response.json();
                    console.error('Aucune data de user trouvé', errorData);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchUserData();
    }, [dispatch]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!firstName || !lastName) {
        return <div>Oh ce n'est pas normal d'être ici <Link to="/">Retourner à l'accueil</Link> </div>;
    }

    return (
        <div className='userpage'>
            <div className='top-text'>
                <h1>Welcome back
                    <br/>
                    {firstName} {lastName}
                </h1>
            </div>
            <div className='button_modal'>
                <div className='button_open_modal_name' onClick={openModal}>
                    <button>Edit Name</button>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {/* Contenu du modal ici */}
                </Modal>
            </div>

            <div className='balance'>
                <BalanceBox topText="Argent Bank Checking (x8349)" money="$2,082.79" botText="Available Balance"/>
                <BalanceBox topText="Argent Bank Checking (x8349)" money="$2,082.79" botText="Available Balance"/>
                <BalanceBox topText="Argent Bank Checking (x8349)" money="$2,082.79" botText="Available Balance"/>
            </div>
        </div>
    );
}

export default UserPage;
