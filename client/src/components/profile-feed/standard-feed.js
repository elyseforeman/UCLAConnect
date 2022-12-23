import React from "react";
import Card from '../card.js'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function StandardFeed(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing ={2} justifyContent="left" xs={12}> 
            {props.Posts.map((post) => (
                <Grid item key={post._id}>
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
                            RSVP_List={props.RSVPList}
                        />
                </Grid>
            ))}
        </Grid>
        </Box>
    )
}

