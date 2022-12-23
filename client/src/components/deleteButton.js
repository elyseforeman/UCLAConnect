import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAPI from '../services/post.js'
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// From https://mui.com/material-ui/react-dialog/

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function DeleteButton(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    let navigate = useNavigate(); 

    const deletePost = () => {
        PostAPI.deletePost(props.id)
        .then((response) => {
            console.log(response);
            handleClose();
            // Go to previous page
            navigate(-1);
        })
        .catch((response) => console.log(response));
    }

    return (
    <div>
        <Button variant="outlined" endIcon={<DeleteIcon />} onClick={handleClickOpen}>
        Delete
        </Button>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Permanently delete post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This action will delete the post permanently.
            Do you wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deletePost}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}
