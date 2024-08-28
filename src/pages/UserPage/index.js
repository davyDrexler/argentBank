import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import Account from '../../components/Balance';
import { updateUserPseudo, setAuthenticated } from '../../features/userSlice';

function UserPage() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newPseudo, setNewPseudo] = useState('');
    const [isEditing, setIsEditing] = useState(false);

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
                    setNewPseudo(data.body.userName);
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

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUserPseudo(newPseudo));
        setIsEditing(false);
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
                {!isEditing ? (
                    <div className='button_open_modal_name'> 
                        <button onClick={handleEditToggle}>Edit Name</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>
                            <h2>Edit User Info</h2>
                            <div className='modif-box'>
                                <h3>User name:</h3>
                                <input
                                    type="text"
                                    value={newPseudo}
                                    onChange={(e) => setNewPseudo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='modif-box'>
                                <h3>First name:</h3>
                                <input
                                    type="text"
                                    value={firstName}
                                    disabled 
                                />
                            </div>   
                            <div className='modif-box'>
                                <h3>Last name:</h3>
                                <input
                                    type="text"
                                    value={lastName}
                                    disabled 
                                />
                            </div>                    
                        </label>
                        <div className='control-editZone-button'>
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleEditToggle}>Cancel</button>
                        </div>
                        {status === 'loading' && <p>Loading...</p>}
                        {status === 'failed' && <p>{error}</p>}
                    </form>
                )}
            </div>

            <div className='balance'>
                <Account topText="Argent Bank Checking (x8349)" money="$2,082.79" botText="Available Balance"/>
                <Account topText="Argent Bank Checking (x8349)" money="$2,082.79" botText="Available Balance"/>
                <Account topText="Argent Bank Checking (x8349)" money="$2,082.79" botText="Available Balance"/>
            </div>
        </div>
    );
}

export default UserPage;
