// From https://mui.com/material-ui/react-card/
import * as React from 'react';
import {useContext, useState, useEffect, } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RsvpButton from '../components/rsvpButton'
import CalendarButton from '../components/googleCalendar.js'
import {AuthContext} from '../context/AuthContext'
import DeleteButton from '../components/deleteButton.js'
// expand post interface
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import UserAPI from '../services/user'
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  DateTime[0] = month + " " + YMD[2].toString()
  return DateTime.join(" ")
}

export default function ImgMediaCard(props) {
  const {user} = useContext(AuthContext)
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // get post user to link to profile page
  const [postUser, setPostUser] = useState() 
  useEffect(() => {
      const retrieveUser = async () => {
          const res = await UserAPI.getUserById(props.userId);
          setPostUser(res.data)
      };
      retrieveUser();
  }, [props, user, expanded]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={"/post/" + props.link}>
      <CardMedia
        component="img"
        height="140"
        image={props.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {TimeParser(props.startTime)} to {TimeParser(props.endTime)}
        </Typography>
      </CardContent>
      </CardActionArea>


      <CardActions disableSpacing>
        {/* Render RSVP button only if RSVP_List in props*/}
        {user &&  props.RSVP_List &&
        <RsvpButton 
        id={props.link} 
        author={user._id} 
        rsvpList={props.RSVP_List}>
        </RsvpButton>}
        
        <Box sx={{marginLeft: 1,}}>
          {postUser && 
            <Link to={"/profile/"+`${postUser.username}`}>
              {postUser.profilePicture ? 
                <Avatar src={postUser.profilePicture} title={postUser.username}></Avatar> :
                <Avatar sx={{ bgcolor: '#064270' }} title={postUser.username}>{postUser.username.charAt(0)}</Avatar> }
            </Link>}
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          label="Details"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Box sx={{alignContent: 'center',}}>
              <Typography variant="h6">Description:</Typography>
                <Typography paragraph>{props.content}</Typography>
                <Typography variant="h6">Location:</Typography>
                <Typography paragraph>{props.location}</Typography>
                <Typography variant="h6">Organizer:</Typography>
                <Typography vparagraph>{props.organizer}</Typography>
            </Box>

          
          <CalendarButton 
              summary={props.title}
              description={props.content}
              location={props.location}
              start={props.startTime}
              end={props.endTime}
          ></CalendarButton>

         {user && (user._id === props.userId) && <DeleteButton id={props.link}></DeleteButton>}
        </CardContent>
      </Collapse>
    </Card>
  );
}
