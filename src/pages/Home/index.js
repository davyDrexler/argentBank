import React from 'react'
import './styles.css'
import picture from '../../assets/img/bank-tree.jpeg'

function Home() {
    return (
      <div>
        <div className='image'>
            <img src={picture} alt='arbre avec de largent'/>
        </div>
        <div className='boxText'>
            <div className='textZone'>
                <h2>No fees.<br/>No minimum deposit.<br/>High interest rates.</h2>
                <h3 className='subtitle'>Open a saving account with Argent Bank today</h3>
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  