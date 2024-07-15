import React from 'react';
import './styles.css';

function IconText({ iconPath, altText, text, subText }) {
    return (
        <div className="icon-text">
            <div className='green-circle'>
                <img src={iconPath} alt={altText} className="icon-image" />
            </div>
            <div className='bottom-text'>
                <h2>{text}</h2>
                <p>{subText}</p>
            </div>
        </div>
    )
}

export default IconText;
