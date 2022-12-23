import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { getOutlinedInputUtilityClass } from '@mui/material';





const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(2),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#8bb8e880',
    border: '1px solid #03345ae6',
    fontSize: 16,
    padding: '10px 26px 18px 12px',
    bottomBorder: 2,
    borderColor: '#6b9ed5',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));


export default function MapFilter({locationFilterStatus, setLocationFilterStatus,
                                   locationFilter, setLocationFilter,
                                   dateFilterStatus, setDateFilterStatus,
                                   dateFilter, setDateFilter})
 {                           

  const handleLocationChange = (event) => {
    event.preventDefault()
    if(event.target.value === "")
    {
      setLocationFilter("")
      setLocationFilterStatus(false)
      return;
    }
    setLocationFilterStatus(true)
    setLocationFilter(event.target.value)
  }

  const handleDateChange = (event) => {
    event.preventDefault()
    
    if(event.target.value === "")
    {
      setDateFilter("")
      setDateFilterStatus(false)
      return;
    }
    setDateFilterStatus(true)
    setDateFilter(event.target.value)
  }

  return (
    <div>
      
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="date-textbox">Search by Date</InputLabel>
        <BootstrapInput id="date-textbox"
                        onChange = {handleDateChange}/>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="location-textbox">Search by Location</InputLabel>
        <BootstrapInput id="location-textbox" 
                        onChange = {handleLocationChange}/>
      </FormControl>
    </div>
  );
}