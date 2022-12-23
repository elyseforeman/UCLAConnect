import React, { useState, useEffect } from "react";
import TagIcon from '@mui/icons-material/Tag';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function FilterBar(props){
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    
    useEffect(()=>{
        props.handleTagChange(tags)
    }, [tags])

    function handleInput(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            addTags(event.target.value)
            setTag("")
        } else if (event.key===" ") {
            addTags(event.target.value)
            setTag("")
        }
      };

    const addTags = (tag) => {
        if(tag.trim() != '' && !tags.includes(tag))
        {
            setTags([...tags, tag])
        }
    }

    const removeTag = (removedTag) =>{
        setTags(tags.filter(tag => tag !== removedTag))
    }

    return(
    <div
    // style={{
    //     position: 'absolute',
    //     down: '100px'
    // }}
    >
        <form onSubmit = {addTags}>
            <div
            // style={{
            //     position: 'absolute',
            //     height: '30px',
            //     width: '200px',
            //     top: '30px',
            //     left: '10px'
            // }}
            >
            
            <TextField 
            id="outlined-basic" 
            // label="Tags" 
            variant="outlined" 
            InputProps={{
                placeholder: "Search by Tags",
                startAdornment: (
                  <InputAdornment position="start">
                    <TagIcon />
                  </InputAdornment>
                ),
              }}
            value={tag}
            onKeyDown={(e) => handleInput(e)}
            onChange={(e) => setTag(e.target.value.trim())}
            />
            </div>
        </form>
        <div>
        <Stack direction="row" spacing={1}>
            {tags.map(tag => (
                <Chip
                label={tag}
                onDelete={(event) => (removeTag(tag))}
                key = {tag}
                />
            ))}

        </Stack>
        </div>
    </div>
    )
}
