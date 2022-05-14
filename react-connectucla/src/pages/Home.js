import { Link } from 'react-router-dom'
import NavBar from '../components/navbar.js'
import Card from '../components/card.js'
import PostAPI from '../services/post.js'
import React, { useState, useEffect } from "react";
// Homepage doubles as the feed.

export default function Home() {
    // Variables
    const [posts, setPosts] = useState([]);

    // Do on render
    useEffect(() => {
        retrievePosts();
    }, []);
    
    const retrievePosts = () => {
        PostAPI.getAll()
        .then(response => {
            console.log(response.data);
            setPosts(response.data.posts);
        })
        .catch(error => console.log(error));
    };
    
    return (
        <div >
            <NavBar></NavBar>
            <h1>Connect UCLA</h1>
            <h2>Welcome home! {posts}</h2>

            

            <Card 
            image="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg" 
            title="Test card" 
            description="Chill with the cows on the pasture, byo MOOO"
            />

            <br/>
            <button style={{display:'flex', alignItems:'center', justifyContent:'center', right:'80px'}}><Link to='/about'>About</Link> </button> 
            <br/>
            <button style={{display:'flex',alignItems:'center'}}><Link to='/menu'>Menu</Link> </button> 
            <br/>
            <button style={{display:'flex',alignItems:'center'}}><Link to='/login'>Login</Link> </button> 
        </div>
    )
}
