// From https://mui.com/material-ui/react-app-bar/

import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../context/AuthContext";
import {LoginButton, FeedButton, MapsButton, ProfileButton, RegisterButton} from './buttons.jsx';
import {Link} from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddEvent from '../pages/addEvent'
import IconButton from '@mui/material/IconButton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function ButtonAppBar() {
  const {user} = useContext(AuthContext);

  // Add Event Popup // 
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1} }>
      <AppBar position="static" style={{ background: '#4287d1'}}>
        <Toolbar padding='10px'>
          <Typography variant="h6" component="div" href="/home" sx={{ flexGrow: 1 }} >
            <Link to="/home"> UCLA Connect </Link>
          </Typography>
          <FeedButton></FeedButton>
          <div>
              <Button color="inherit" startIcon={<AddBoxOutlinedIcon/>}
              title="Create a new event post" onClick={handleToggle}>
              Add Event</Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}>
                <IconButton aria-label="Exit" size="large" color="inherit"onClick={handleClose}>
                  <CancelRoundedIcon fontSize="large" />
                </IconButton>   
                <AddEvent></AddEvent>
             </Backdrop>
        </div>
          <MapsButton></MapsButton>
          {user && <ProfileButton user={user}></ProfileButton>}
          {!user && <LoginButton></LoginButton>}
          {!user && <RegisterButton></RegisterButton>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

