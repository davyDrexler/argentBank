import React from 'react';
import './styles.css';

const BalanceBox = ({ topText, money, botText }) => {
    return (
        <div className="balanceBox">
            <div className='information'>
                <p className="balance-top-text">{topText}</p>
                <p className="money">{money}</p>
                <p className="bot-text">{botText}</p>
            </div>
            <div className='transaction'>
                <button>View transactions</button>
            </div>
        </div>
    );
}

export default BalanceBox;
