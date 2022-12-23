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
// Homepage doubles as the feed.


export default function Feed() {
    // Variables + hooks
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [rsvpList, setRSVPList] = useState(null);
    const {user} = useContext(AuthContext);
    const [indexSearch, setIndexSearch] = useState(false)
    const [swapFeed, setSwapFeed] = useState(false);


    //toggle feed
    const handleSwap = () => {
        setSwapFeed(swapFeed ? false : true);
    };

    // Do on render
    useEffect(() => {
        retrievePosts();
        if (user) {
            retrieveRSVPList();
        } else {
            setRSVPList([]);
        }
    }, [tags, swapFeed, user, indexSearch]);
    
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
        <div >
            <NavBar></NavBar>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // marginTop: 2,
                    marginBottom: 2,
                    alignItems:'center',
                    backgroundColor: '#8bb8e880',
                    borderBottom: 2.5, 
                    borderColor: 'gold',
                }}>
                <Box sx={{
                    marginBottom: 4,
                    marginTop: 2,
                    marginLeft: 1.5,
                    maxHeight: '100px',
                    width: '100%',
                }}>

                <SearchField 
                    setIndex={setIndexSearch} 
                    handleIndexChange={handleIndexSearch}
                ></SearchField>

                <FilterBar handleTagChange={(tags) => handleTagChange(tags)}></FilterBar>
                    
                </Box>
                {user && swapFeed && 
                <IconButton 
                    aria-label="Return to Home Timeline"
                    onClick={handleSwap}>
                <HomeOutlinedIcon />



                </IconButton>}
                {user && !swapFeed &&
                <IconButton 
                    aria-label="Switch to Following Timeline"
                    onClick={handleSwap}>
                    <GroupIcon /> 
                </IconButton>}
            </Box>


        {/* <div className="feedBottom"> */}

{/*   
                <SearchField 
                    setIndex={setIndexSearch} 
                    handleIndexChange={handleIndexSearch}
                ></SearchField>

                <FilterBar handleTagChange={(tags) => handleTagChange(tags)}></FilterBar> */}
            {/* </Box> */}

            <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
            {user && swapFeed && <FollowFeed username={user.username}/>}
            </Box>
            {!swapFeed && 
            <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center">
            <Grid item container spacing={3} xs={8}>
                {posts.map(post => 
                    {
                    return (
                        <Grid item md={4} key={post._id}>
                            <Card 
                                link={post._id}
                                userId={post.userId}
                                image={post.imgurl} 
                                title={post.title}
                                content={post.content} //add event stuff, event.title? etc
                                startTime={post.startTime}
                                endTime={post.endTime}
                                location={post.location}
                                tags={post.tags}
                                organizer={post.author}
                                RSVP_List={rsvpList}
                            />
                        </Grid>
                        )
                    })
                }
            </Grid>
            </Grid>
            </Box>}
        </div>
        // </div>
    )
}

