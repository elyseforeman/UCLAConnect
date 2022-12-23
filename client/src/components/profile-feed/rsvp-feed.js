import PostAPI from '../../services/post.js'
import UserAPI from '../../services/user.js'
import React, { useState, useEffect } from "react";
import StandardFeed from './standard-feed'
// Homepage doubles as the feed.

export default function RSVPFeed(props) {
    const [posts, setPosts] = useState([]);
    const [rsvpList, setRSVPList] = useState([]);

    useEffect(() => {
        const retrieveRSVPPosts = () => {
            PostAPI.getRSVPPosts(props.username).then(res => {
                setPosts(res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
                );
            }).catch(error => console.log(error));
        }
        retrieveRSVPPosts();
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

