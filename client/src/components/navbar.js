// From https://mui.com/material-ui/react-app-bar/

import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../context/AuthContext";
import {LoginButton, FeedButton, MapsButton, AddEventButton, ProfileButton, RegisterButton} from './buttons.jsx';
import {Link} from 'react-router-dom';


export default function ButtonAppBar() {
  const {user} = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1} }>
      <AppBar position="static" style={{ background: '#4287d1'}}>
        <Toolbar padding='10px'>
          <Typography variant="h6" component="div" href="/home" sx={{ flexGrow: 1 }} >
            <Link to="/home"> UCLA Connect </Link>
          </Typography>
          <FeedButton></FeedButton>
          <AddEventButton LoggedIn={user}></AddEventButton>
          <MapsButton></MapsButton>
          {user && <ProfileButton user={user}></ProfileButton>}
          {!user && <LoginButton></LoginButton>}
          {!user && <RegisterButton></RegisterButton>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

