import React from 'react'
import './styles.css'
import picture from '../../assets/img/bank-tree.jpeg'
import IconText from '../../components/Icon_text'
import chat from '../../assets/img/icon-chat.png'
import money from '../../assets/img/icon-money.png'
import security from '../../assets/img/icon-security.png'

function Home() {
    return (
      <div>
        <div className='image'>
            <img src={picture} alt='arbre avec de largent'/>
        </div>
        <div className='boxText'>
          <div className='textZone'>
            <h2 className='title'>No fees.<br/>No minimum deposit.<br/>High interest rates.</h2>
            <p className='subtitle'>Open a saving account with Argent Bank today</p>
          </div>
        </div>
        <div className='textIcon'>
          <IconText iconPath={chat} altText="Chat icon" text="You are our #1 priority" subText="Need to talk to a representative? You can get in touch through our 
          24/7 chat or through a phone call in less than 5 minutes."/>
          <IconText iconPath={money} altText="money icon" text="More savings means higher rates" subText="The more you save with us, the higher your interest rate will bel."/>
          <IconText iconPath={security} altText="money icon"  text="Security you can trust" subText="We use top of the line encryption to make sure your
          data and money is always safe."/>
        </div>
      </div>
    );
  }
  
  export default Home;
  