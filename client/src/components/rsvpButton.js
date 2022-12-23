import Button from '@mui/material/Button';
import PostAPI from '../services/post.js'
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Link } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function RsvpButton(props) {
    const {user} = useContext(AuthContext)
    const [open, setOpen] = React.useState(false);
    const [RsvpBool, setRsvpBool] = React.useState(props.rsvpList.includes(props.id))

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const rsvpPost = (bool) => {
        console.log("rsvp post props.id")
        console.log(props.id)
        PostAPI.likePost(props.id, props.author, bool)
        .then((response) => {
            console.log(response);
            setRsvpBool(!RsvpBool);
        })
        .catch((response) => console.log(response));
    }
    
    if (!user) { // No user is logged in - refer to login page
        return (
            <div>
                <Button variant="outlined" endIcon={<SendIcon />} onClick={handleClickOpen}
                style={{backgroundColor:'white'}}
                >
                RSVP
                </Button>
                <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Not logged in"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You must log in to RSVP. Do you want to log in?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Link to="/login"><Button>Yes</Button></Link>
                </DialogActions>
                </Dialog>
            </div>
            );
    } else if (RsvpBool) {
        return (
            <div>
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => rsvpPost(false)}>
                RSVP
                </Button>
            </div>
            );
    } else {
        return (
            <div>
                <Button variant="outlined" endIcon={<SendIcon />} onClick={() => rsvpPost(true)}
                style={{backgroundColor:'white'}}>
                RSVP
                </Button>
            </div>
            );
    }
}
