import PostAPI from '../../services/post.js'
import UserAPI from '../../services/user.js'
import React, { useState, useEffect } from "react";
import StandardFeed from './standard-feed'


export default function FollowFeed(props) {
    const [rsvpList, setRSVPList] = useState([]);
    const [posts, setPosts] = useState([]);

    // Variables + hooks
    useEffect(() => {
        const retrievePosts = async () => {
            const res = await PostAPI.getPostsByFollowing(props.username)
            setPosts(
                res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        retrievePosts();
        retrieveRSVPList();
    }, [props.username]);
    
    const retrieveRSVPList = () => {
        UserAPI.getUser(props.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }
    //container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    return (
        <StandardFeed Posts={posts} RSVPList={rsvpList}></StandardFeed>
    )
}

