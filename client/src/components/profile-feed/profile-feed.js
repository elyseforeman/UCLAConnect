import PostAPI from '../../services/post.js'
import UserAPI from '../../services/user.js'
import React, { useState, useEffect } from "react";
import StandardFeed from './standard-feed'


export default function ProfileFeed(props) {
    const [rsvpList, setRSVPList] = useState([]);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const retrievePosts = async () => {
            const res = await PostAPI.getPostsByUser(props.username)
            console.log("res.data")
            console.log(res.data)
            setPosts(
                res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        console.log("profile-feed posts:" )
        console.log(posts)
        retrievePosts();
        retrieveRSVPList();
    }, [props.username]);
    
    const retrieveRSVPList = () => {
        UserAPI.getUser(props.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }

    return (
        <StandardFeed Posts={posts} RSVPList={rsvpList}></StandardFeed>
    )
}

