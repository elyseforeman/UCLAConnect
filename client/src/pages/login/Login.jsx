import React, { useContext, useRef} from 'react';
import Button from '@mui/material/Button';
import {loginCall} from "../../services/loginCall"
import {AuthContext} from "../../context/AuthContext"
import CircularProgress from '@mui/material/CircularProgress';
import "./login.css";
import {Link} from 'react-router-dom'

export default function Login() {
    const username= useRef();
    const password= useRef();
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleLogin= (e)=>{
        e.preventDefault();
        loginCall (
            {
            username: username.current.value, 
            password: password.current.value 
            }, 
            dispatch
        );
    };

    return (
        <div className="login">
            <Button className="loginLogoBox" href="/home">ConnectUCLA</Button>
            <form className="loginBox" onSubmit={handleLogin}>
                <input 
                    className="loginInput" 
                    placeholder="Username" 
                    type="username"
                    ref={username}
                    required
                />
                
                <input 
                    className="loginInput" 
                    placeholder="Password" 
                    type="password"
                    ref={password}
                    minLength="8"
                    required
                />

                <button className="loginButton" 
                type="submit"
                disabled={isFetching}>
                    {isFetching ? <CircularProgress color="success"/> : "Log In"}
                </button>
                <Link className="loginRegisterButton" to="/register">
                    <button 
                        className="loginRegisterButton">
                        Create a new account!
                    </button>
                </Link>
            </form>
        </div>
    );
}
