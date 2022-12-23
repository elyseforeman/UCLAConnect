import Feed from "./pages/feed.js"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from "./pages/home/home"
import ErrorPage from "./pages/errorPage.js"
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx"
import Profile from "./pages/profile/Profile.jsx"
import PostPage from "./pages/postPage.js"
// imports for Context API 
import AddEvent from "./pages/addEvent.js";
import Maps from "./pages/maps.js"
// imports for Context API 
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import React from 'react'

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <GoogleOAuthProvider clientId="1074046883630-561fblnmo26ek7lppki22d1ldflgir10.apps.googleusercontent.com">
       <BrowserRouter>
        <Routes>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="*" element={<ErrorPage/>}/>
        <Route path="/login"
        element={ user ? <Navigate to="/home" /> : <Login /> }/>
        <Route path="/register" 
        element={ user ? <Navigate to="/home" /> : <Register/>}/>
        <Route path="/addEvent" element={<AddEvent/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/post/:id" element={<PostPage/>}/>
        <Route path="/maps" element={<Maps/>}/>
        </Routes>
       </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  ) 
}

export default App;
