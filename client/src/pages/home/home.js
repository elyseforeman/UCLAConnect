import React, { useEffect } from 'react';
// import '../App.css';
import { Button } from './introButton.js';
import './home.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import uclavideo1 from '../../images/uclavideo1.mp4'
import NavBar from '../../components/navbar.js'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {logoutCall} from "../../services/loginCall"
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from "../../context/AuthContext";
import {LoginButton} from '../../components/buttons';

function Home() {
    const {user} = useContext(AuthContext);

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
        {!user && <LoginButton></LoginButton>}
      </div>
    </div>
      </div>
  );
}

export default Home;

    