import React, { useEffect } from 'react';
// import '../App.css';
import { Button } from './introButton.js';
import './introPage.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import uclavideo1 from './uclavideo1.mp4'
import NavBar from '../components/navbar.js'

function IntroPage() {
  return (
      <div
      >
          <NavBar></NavBar>
    <div className='hero-container'
          style= {{
            overflow: 'hidden',
            maxHeight: '90vh'
      }}
    >
      <video src={uclavideo1} autoPlay loop muted 
      />
      <img src={logo} alt="Logo" 
      style={{height:'350px' , width:'450px'}}
      />
      <p>Explore different events at UCLA!</p>
      <div className='hero-btns'>
      <Link to='/feed' className='btn-mobile'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          backgroundColor= 'blue'
        >
          GO TO EVENTS
        </Button>
        </Link>
        <Link to='/login' className='btn-mobile'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          backgroundColor= 'blue'
        >
          LOGIN <i className='far fa-play-circle' />
        </Button>
        </Link>
      </div>
    </div>
      </div>
  );
}

export default IntroPage;