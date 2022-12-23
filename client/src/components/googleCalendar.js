import React from "react";
import { useGoogleLogin } from '@react-oauth/google';
import Button from '@mui/material/Button';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PostAPI from '../services/post.js'
// From 
// https://www.npmjs.com/package/react-google-login
// https://reactjsexample.com/google-oauth2-using-the-new-google-identity-services-sdk-for-react/

export default function CalendarButton(props) {

    const responseGoogle = (response) => {
        const { code } = response // destruct code from response
        PostAPI.addToCalendar(code, props) // call api with code to generate tokens
        .then(response => {
            console.log("Successfully added to calendar")
            console.log(response)})
        .catch(error => {
            console.log("Cannot add to calendar")
            console.log(error)})
    }
    
    const errorGoogle = (response) => {
        console.log("Could not sign in with Google");
        console.log(response);
    }
    
    const login = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: errorGoogle,
        flow: 'auth-code',
        scope: "openid email profile https://www.googleapis.com/auth/calendar",
    });

    return(
        <div>
            <Button variant="outlined" style={{backgroundColor:'white'}}
             endIcon={<EventAvailableIcon />} onClick={() => login()}>
            Add to Calendar
            </Button>
        </div>
    );
}