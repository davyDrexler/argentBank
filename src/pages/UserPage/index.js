import React, { useEffect, useState } from 'react';
import './styles.css';

function UserPage() {
    const [userData, setUserData] = useState(null);

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

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='userpage'>
            <div className='top-text'>
                <h1>Welcome back</h1>
                <h2>{userData.firstName} {userData.lastName}</h2>
            </div>
        </div>
    );
}

export default UserPage;
