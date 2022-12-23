import NavBar from '../components/navbar.js'
import Card from '../components/card.js'
import PostAPI from '../services/post.js'
import UserAPI from '../services/user.js'
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilterBar from "../components/searchFilter"
import SearchField from "../components/searchPosts"
import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react';
import FollowFeed from '../components/profile-feed/follow-feed'
import Button from '@mui/material/Button';
import './feed.css'
import IconButton from '@mui/material/IconButton';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import StandardFeed from '../components/profile-feed/standard-feed'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
// Homepage doubles as the feed.


export default function Feed() {
    // Variables + hooks
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [rsvpList, setRSVPList] = useState(null);
    const {user} = useContext(AuthContext);
    const [indexSearch, setIndexSearch] = useState(false)
    const [seeFollowing, setSeeFollowing] = useState(false);

    // TABS CONTROL //
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const [value, setValue] = React.useState(0);
   
    //toggle feed
    const toggleFollowing = () => {
        setSeeFollowing(seeFollowing ? false : true);
    };

    // Do on render
    useEffect(() => {
        retrievePosts();
        if (user) {
            retrieveRSVPList();
        } else {
            setRSVPList([]);
        }
    }, [tags, seeFollowing, user, indexSearch]);
    
    // Get list of RSVP'ed post for user
    const retrieveRSVPList = () => {
        UserAPI.getUser(user.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }

    // Get filtered posts from server
    const retrievePosts = () => {
        if (indexSearch) {
            //setTags([]) //resets page again...
            PostAPI.getPostsByIndex(indexSearch)
            .then(response =>{
                setPosts(response.data)
            })
            .catch(error => console.log(error));
        } else if(tags.length === 0)
        {
            if (user) { // Customly sorted posts
                PostAPI.getPersonalized(user._id)
                .then(response =>{
                    setPosts(response.data)
                })
                .catch(error => console.log(error));
            } else { // Default feed if no user logged in 
                PostAPI.getAll()
                .then(response =>{
                    setPosts(response.data)
                })
                .catch(error => console.log(error));
            }
        }
        else{ // If tags are set, return appropriate posts
            PostAPI.getPostByTags(tags)
                .then(response => {
                    setPosts(response.data)
                })
                .catch(error => console.log(error));
        }
    };
    


    const handleTagChange = (tags) =>{
        // When adding tags, remove index search
        setTags(tags)
        setIndexSearch(false)
    }

    const handleIndexSearch = () => {
        // When searching index, reset tags
        setTags([])
    }


    return (
        <div className="feed"> 
            <NavBar></NavBar>
            <div className='feedTop'>
                <SearchField setIndex={setIndexSearch} handleIndexChange={handleIndexSearch}></SearchField>
                <FilterBar handleTagChange={(tags) => handleTagChange(tags)}></FilterBar>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="icon position tabs example"
                >
                    <Tab label="All"/> 
                    {user && <Tab label="For You" href="/home"/>}
                    {user && <Tab icon={<GroupIcon />} iconPosition="start" label="Following" onClick={toggleFollowing}/>}
                    <Tab label="Today"/> 
                    <Tab label="Clubs"/>
                    <Tab label="Sports"/>
                    <Tab label="Academic"/>
                </Tabs>
            </div>
            <div className='feedBottom'>
                <Box sx={{display: 'flex', flexDirection:'column', alignItems:'left'}}>
                    <Typography variant="h3">Trending Events</Typography>
                    {user && seeFollowing && <FollowFeed username={user.username}/>}
                    {!seeFollowing && <StandardFeed Posts={posts} RSVPList={rsvpList}></StandardFeed>}
                </Box>
            </div>
        </div>
    )
}


