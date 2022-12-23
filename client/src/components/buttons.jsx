import React from 'react';

// BUTTON STYLING IMPORTS
import Button from '@mui/material/Button';

// LOGOUT /LOGIN /SIGN UP BUTTON IMPORTS
import LogoutIcon from '@mui/icons-material/Logout';
import {logoutCall} from "../services/loginCall"
import {useNavigate} from 'react-router-dom';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';

// PROFILE BUTTON IMPORTS
import Avatar from '@mui/material/Avatar';

// HOME BUTTON IMPORTS
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

// FEED BUTTON IMPORTS 
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';

// ADD EVENT BUTTON IMPORTS
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

// MAPS BUTTON IMPORTS
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

// GLOBAL CONSTANTS
import {Link} from 'react-router-dom';


// NAV BAR BUTTONS // 
export function LogoutButton(props) {
    const Navigate = useNavigate();

    const handleLogout= (e)=>{
        e.preventDefault();
        logoutCall(props.Dispatch ? props.Dispatch : null);
        Navigate("/home");
    };
    return (
        <Button 
            color="inherit" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}>
            Log Out
        </Button>
    )
}

export function LoginButton() {
    return (
        <Button 
            href="/login"
            color="inherit" 
            aria-label="Log in to your account"
            startIcon={<LoginOutlinedIcon />}> 
            Log In
        </Button>
    )
}
export function RegisterButton() {
    return (
        <Button 
            href="/login"
            color="inherit" 
            aria-label="Create a new account"
            startIcon={<SentimentVerySatisfiedSharpIcon />}> 
            Sign Up
        </Button>
    )
}
export function ProfileButton(props) {
    return (
        <Link to={`/profile/${props.user.username}`}>
            <Avatar 
                alt={props.user.username} 
                src={props.user.profilePicture ? props.user.profilePicture : require('../pages/profile/images/bruin-bear.jpeg')} 
                title="Profile"/>
        </Link>
    )
}

export function HomeButton() {
    return (
        <Button 
            href="/home" 
            color="inherit"
            startIcon={<HomeOutlinedIcon/>}
            title="Go to Home">
            Home
        </Button>
    )
}

export function FeedButton() {
    return (
        <Button 
            href="/feed"
            color="inherit"
            startIcon={<LocalActivityOutlinedIcon/>}
            title="View events">
            Events
        </Button>
    )
}

export function AddEventButton(props) {
    return (
        <Button 
            color="inherit" 
            href={props.LoggedIn ? "/addEvent" : "/login"}
            startIcon={<AddBoxOutlinedIcon/>}
            title="Create a new event post"
            >
            Add Event
        </Button>
    )
}

export function MapsButton() {
    return (
        <Button 
            color="inherit" 
            href="/maps" 
            startIcon={<MapOutlinedIcon/>}
            title="View map">
            Map
        </Button>
    )
}
// POST BUTTONS // 
