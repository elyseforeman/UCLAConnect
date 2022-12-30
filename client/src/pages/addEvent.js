import React from 'react'
import {useState, useContext} from 'react'
import "./addEvent.css";
import PostAPI from '../services/post.js'
import {useNavigate} from 'react-router-dom'
// import NavBar from '../components/navbar.js'
import TagsInput from './inputTags.js';
import { AuthContext } from "../context/AuthContext";
import Button from '@mui/material/Button';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormControl } from '@mui/material/FormControl';

const AddEvent = () => {
    const navigate = useNavigate()
    const [title, setTitle]=useState('')
    const [organizer, setOrganizer]=useState('')
    const [startTime, setstartTime]=useState('')
    const [endTime, setendTime]=useState('')
    const [details, setDetails]=useState('')
    const [url, setUrl]=useState('')
    const [location, setLocation]=useState('')
    const [tags, setTags] = useState([]);
    const {user} = useContext(AuthContext);
    console.log(user._id)

            const handleSubmit = (e) => {
        e.preventDefault()
        //post object MUST CORRESPOND TO POST SCHEMA and be json object
        const event= {
            userId: user._id,
            title: title, 
            author: organizer, 
            location:location,
            startTime:startTime, 
            endTime:endTime, 
            content:details, 
            imgurl:url,
            tags: tags
        }
        
        //post request code, not working
        PostAPI.createPost(event)
        .then(response => {console.log(response.data) 
            navigate('/')})
        .catch(error => console.log(error));
    }

    // OPEN AND CLOSE THE END DATE AND TIME
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(checked ? false : true);
    };

    return (
        <div>
            <Box className="cpContainer">
            <h2>Create New Event</h2>

            <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" id="outlined-basic" label="Event Name" variant="outlined" placeholder="ex. Winter Bake Sale" 
            value={title} onChange={(e)=> setTitle(e.target.value)} required/>

            <TextField fullWidth margin="normal" id="outlined-basic" label="Organizer Name" variant="outlined" placeholder="ex. Bruin Baking Club" 
            value={organizer} onChange={(e)=> setOrganizer(e.target.value)} required/>

            <TextField fullWidth margin="normal" id="outlined-basic" label="Start Date and Time" variant="outlined" InputLabelProps={{shrink: true,}} 
            value={startTime} onChange={(e)=> setstartTime(e.target.value)} type="datetime-local" required/>

            <FormControlLabel control={<Switch size="small" checked={checked} onChange={handleChange} 
            inputProps={{ 'aria-label': 'controlled' }}/>} label="End Date and Time" />
            
            {checked && 
            <TextField fullWidth margin="normal" id="outlined-basic" label="End Date and Time" variant="outlined" InputLabelProps={{shrink: true,}} 
            value={endTime} onChange={(e)=> setendTime(e.target.value)} type="datetime-local"/>}
            
            <TextField fullWidth margin="normal" id="outlined-basic" label="What are the details?" 
            variant="outlined" placeholder="ex. Join us on BruinWalk to buy or sell our home made baked goods!" multiline rows={3}
            value={details} onChange={(e)=> setDetails(e.target.value)} required/>

            <TextField fullWidth margin="normal" id="outlined-basic" label="Cover Picture URL" variant="outlined"
            value={url} onChange={(e)=> setUrl(e.target.value)} type="url" required/>

            <div className="inputGp">
            <label>Add Tags</label>
                <TagsInput tags={tags} setTags={setTags}/>
            </div>
            <Button variant="outlined">Post Event</Button>
            </form>
            
            </Box>
        </div>
    );
}
export default AddEvent;