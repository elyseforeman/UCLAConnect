import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavBar from '../components/navbar.js'
import PostAPI from '../services/post.js'
import UserAPI from '../services/user.js'
import CalendarButton from '../components/googleCalendar.js'
import DeleteButton from '../components/deleteButton.js'
import RsvpButton from '../components/rsvpButton'
import "./addEvent.css";
import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react';
import posts from '../api/posts.js';

function TimeParser(time) {
    const DateTime = time.split("T")
    // Convert to American Time
    const HourMin = DateTime[1].split(":")
    HourMin[0] = ((parseInt(HourMin[0]) + 11) % 12 + 1).toString()
    const suffix = parseInt(HourMin[0]) > 11 ? "AM" : "PM"
    DateTime[1] = HourMin.join(":") + " " + suffix
    
    const YMD = DateTime[0].split("-").map((i)=>parseInt(i))
    const date = new Date();
    date.setMonth(YMD[1]-1)
    const month = date.toLocaleString('en-US',{month:"short",})
    DateTime[0] = month + " " + YMD[2].toString() + " " + YMD[0].toString()
    return DateTime.join(" ")
  }
export default function PostPage() {
    // Variables + hooks
    const {user} = useContext(AuthContext)
    const [post, setPost] = useState([]);
    const [rsvpList, setRSVPList] = useState(null);
    let { id } = useParams();

    // Do on render
    useEffect(() => {
        retrievePost();
        if (user) {
            retrieveRSVPList();
        } else {
            setRSVPList([])
        }
    }, [user]);

    const retrievePost = () => {
        PostAPI.getPostById(id)
        .then(response => {
            setPost(response.data);
        })
        .catch(error => console.log(error));
    };

    const retrieveRSVPList = () => {
        UserAPI.getUser(user.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }
    return (
        <div
        >
            <NavBar></NavBar>
            <div className="createPostPage"
            style={{ 
                backgroundImage: `url(${post.imgurl})`,
                height: '100vh',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                backgroundSize: 'cover'
                }}
            >
            <div className="cpContainer"
            style={{ 
                position: 'absolute',
                width: '500px',
                height: '350px',
                left: '75px'
            }}>
            <a style={{color:'black'}}
            >Event</a>
            {post.title}
           <a
           style={{color:'black'}}
           >When?</a>
            From {post.startTime ? TimeParser(post.startTime) : null} <br/>
            To {post.endTime ? TimeParser(post.endTime) : null}
            <a
            style={{color:'black'}}
            >Where?</a>
           {post.location}
           <br></br>
           <a style={{color:'black'}}>Organizer</a>
           {post.author}
            </div>
            <div className="cpContainer"
            style={{ 
                position: 'absolute',
                width: '500px',
                height: '350px',
                right: '75px'
            }}>
           <a style={{color:'black'}}>Details</a>
           {post.content}
           <a style={{color:'black'}}>Tags</a>
           {post.tags ? post.tags.join(", ") : null}
           <a style={{color:'black'}} href={post.imgurl}>Click for Poster Link</a>
            </div>
            <CalendarButton 
              summary={post.title}
               description={post.content}
              location={post.location}
              start={post.startTime}
              end={post.endTime}
              ></CalendarButton>
            
            {user && user._id===post.userId && <DeleteButton id={id}>
            </DeleteButton>}
            {user && rsvpList!=null && <RsvpButton id={id} author={user._id} rsvpList={rsvpList}></RsvpButton>}
            </div>
            {/* This is the post page ID {post._id} */}
        </div>
    );

}