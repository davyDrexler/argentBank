import React from 'react'
import logo from '../../assets/img/argentBankLogo.png'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <header className="header">
            <div className='Logo'>
                <img src={logo} alt="ArgentBank Logo" />
            </div>
            <div className='right_button'>
                <FontAwesomeIcon className='icon' icon={faCircleUser} />
                <a className='signin' href='*'>sign in</a>
            </div>
        </header>
    )
}

export default Header