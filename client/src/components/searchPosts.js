// From https://mui.com/material-ui/react-app-bar/

import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function SearchButton(props) {
    const [text, setText] = React.useState("")

    function handleInput(event) {
        if (event.key==="Enter") {
            props.setIndex(event.target.value)
            props.handleIndexChange()
            setText("")
        }
      };

    return (
      <TextField 
            id="outlined-basic" 
            label="Search" 
            variant="outlined" 
            InputProps={{
                placeholder: "Search by Content",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            value={text}
            onKeyDown={(e) => handleInput(e)}
            onChange={(e) => setText(e.target.value)}
       />
    )
}