import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import "./register.css"
import UserAPI from '../../services/user.js'
import {Link} from 'react-router-dom'
// import Checkbox from '@mui/material/Checkbox';

export default function Register() {
    const username= useRef();
    const password= useRef();
    const email= useRef();
    const passwordAgain= useRef();
    const navigate = useNavigate();
    // const isOrganization = useRef();
    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const handleRegister= async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords do not match. Try again.")
        } else if (isChecked && !email.current.value) {
            email.current.setCustomValidity("Email required for organization registration.")
        } else {
            try {
                const user = {
                    username: username.current.value,
                    password: password.current.value,
                    email: email.current.value ? email.current.value : null,
                    isOrganization: isChecked,
                }
                await UserAPI.registerUser(user);
                navigate("/login");
            } catch(err){
                console.log(err);
            }
        }
    };

    return (
        <div className="register">
            <Button className="regLogoBox" href="/home">ConnectUCLA</Button>
            <form className="regBox" onSubmit={handleRegister}>
                <input 
                    className="regInput" 
                    placeholder="Username" 
                    type="username *"
                    ref={username}
                    required
                />
                    <label>
                    <input
                        type="checkbox"
                        id="organization"
                        name="organization"
                        value="is_organization"
                        checked={isChecked}
                        onChange={handleOnChange}
                    />
                      I am a club or campus organization.
                    </label>
                <input 
                    className="regInput" 
                    placeholder="Email" 
                    type="email"
                    ref={email}
                />
                
                <input 
                    className="regInput" 
                    placeholder="Password *" 
                    type="password"
                    ref={password}
                    minLength="8"
                    required
                />

                <input 
                    className="regInput" 
                    placeholder="Confirm *" 
                    type="password"
                    ref={passwordAgain}
                    minLength="8"
                    required
                />

                <button 
                    className="regButton"
                    type="submit">
                    Register
                </button>

                <Link className="registerLoginButton" to="/login">
                    <button 
                        className="registerLoginButton">
                        Log in
                    </button>
                </Link>
            </form>
        </div>
    );
}
