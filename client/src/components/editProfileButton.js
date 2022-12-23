import React from 'react'
import {useRef, useContext} from 'react'
import Button from '@mui/material/Button';
import {AuthContext} from "../context/AuthContext"
import UserAPI from '../services/user';
import PublishIcon from '@mui/icons-material/Publish';
import {useNavigate} from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
export default function EditProfileButton(){
    //input fields
    const new_username= useRef();
    // const new_password= useRef();
    const new_email= useRef();
    // const new_password_again= useRef();
    const new_description= useRef();
    const new_profile_picture = useRef();
    const new_cover_picture = useRef();
    // const is_private = useRef();
    //context
    const {user, dispatch} = useContext(AuthContext);
    const Navigate = useNavigate();

    const handleEditSubmit= async (e)=>{
        e.preventDefault();
        try {
            const updated_user = {
                _id: user._id,
                username: new_username.current.value ? new_username.current.value : user.username,
                email: new_email.current.value ? new_email.current.value : user.email,
                profilePicture: new_profile_picture.current.value ? new_profile_picture.current.value : user.profilePicture,
                coverPicture: new_cover_picture.current.value ? new_cover_picture.current.value : user.coverPicture,
                description: new_description.current.value ? new_description.current.value : user.description,
                // isPrivate: is_private.current.checked
            }
            await UserAPI.updateUser(updated_user)
            Navigate(`/profile/${updated_user.username}`)
            dispatch({ type: "UPDATE", payload: updated_user });
        } catch(err){
            console.log(err);
        }
    };

    return (
        <Box sx={{display: 'flex', flexDirection: "column", maxWidth: "400px"}}>
        <form className="editBox" onSubmit={handleEditSubmit}>
            <TextField 
                label="New Username"
                placeholder="New Username" 
                margin="normal"
                type="username"
                minLength="8"
                inputRef={new_username}
                variant="standard" 
            />
            <TextField 
                label="New Email"
                placeholder="New Email" 
                margin="normal"
                type="email"
                inputRef={new_email}
                variant="standard" 
            />
            <TextField 
                label="New Profile Picture URL"
                placeholder="New Profile Picture URL" 
                margin="normal"
                type="url"
                inputRef={new_profile_picture}
                variant="standard" 
            />
            <TextField 
                label="New Cover Picture URL"
                placeholder="New Cover Picture URL" 
                margin="normal"
                type="url"
                inputRef={new_cover_picture}
                variant="standard" 
            />
            <TextField
                id="Profile Description"
                label="New Profile Description"
                placeholder="New Cover Picture URL" 
                margin="normal"
                multiline
                maxRows={4}
                inputRef={new_description}
            />
            {/* <FormControlLabel
                control={<Checkbox inputRef={is_private}/>}
                label="Private Account"
                labelPlacement="end"
            /> */}
            <FormHelperText>A private account is viewable only by followers you approve.</FormHelperText>
            <Button variant="outlined" startIcon={<PublishIcon />} type="submit">Submit</Button>
        </form>
        </Box>
    )
}