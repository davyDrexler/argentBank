import React from 'react';
import logo from '../../assets/img/argentBankLogo.png';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pseudo = useSelector((state) => state.user.pseudo);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleSignOut = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/'); 
    };

    return (
        <header className="header">
            <div className='Logo'>
                <Link to="/">
                    <img src={logo} alt="ArgentBank Logo" />
                </Link>
            </div>
            <div className='right_button'>
            <p>{pseudo ? <Link to="/userpage">{pseudo}</Link> : ''}</p>
                <FontAwesomeIcon className='icon' icon={faCircleUser} />
                {isAuthenticated ? (
                    <button onClick={handleSignOut}>Sign out</button>
                ) : (
                    <Link className="signin" to="/login">Sign in</Link>
                )}
            </div>
        </header>
    );
}

export default Header;
