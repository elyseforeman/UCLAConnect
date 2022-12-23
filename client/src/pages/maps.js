import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api"
import { Link } from 'react-router-dom'
import "@reach/combobox/styles.css"
import mapStyles from "../components/mapStyles.js"
import { useState, useEffect } from 'react'
import Geocode from "react-geocode";
import PostAPI from '../services/post.js'
import MapFilter from '../components/mapFilter.js'
import NavBar from '../components/navbar.js'
import Button from "@mui/material/Button"
const options ={
    styles: mapStyles,
    disableDefaultUI:true,
    zoomControl: true,
}

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}

const uclaLAT = 34.068920
const uclaLNG = -118.445183

let allowedLAT;
let allowedLNG;


let allowedPosition = false;
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

const checkDate = (startTime) => {
    var d = new Date()
    var date = new Date(); // Or the date you'd like converted.
    var currentTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();


    let currentTimeArray= currentTime.split("T")
    let startTimeArray = startTime.split("T")
    if(startTimeArray[0] !== currentTimeArray[0])
    {
        return false;
    }
    else{
        console.log("Current Time: " + currentTime)
        console.log("StartArray: " + startTimeArray)
        console.log("Current Array: " + currentTimeArray)
        let startHour = startTimeArray[1].split(":")[0]
        let currentHour = currentTimeArray[1].split(":")[0]
        console.log("Start: " + startHour)
        console.log("Current: " + currentHour)
        if(Math.abs(startHour - currentHour)<= 2)
        {
            return true
        }
        return false
    }
}
navigator.geolocation.getCurrentPosition(async (position) => {
    allowedPosition = true;
    allowedLAT = await position.coords.latitude
    allowedLNG = await position.coords.longitude

  });

const libraries = ["places"]
export default function Maps() {

    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null);
    const [locationFilterStatus, setLocationFilterStatus] = useState(false)
    const [locationFilter, setLocationFilter] = useState("")
    const [dateFilterStatus, setDateFilterStatus] = useState(false)
    const [dateFilter, setDateFilter] = useState("")

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    useEffect(() => {
        locationToMarker();
    }, [locationFilter, dateFilter]);



    const mapRef = React.useRef();
    const onMapLoad = React.useCallback(async (map) => {
        mapRef.current = await map;
    },[])
    
    
      
    let center = {
        lat: allowedPosition ? allowedLAT : uclaLAT,
        lng: allowedPosition ? allowedLNG : uclaLNG,
    }
    
    const locationToMarker = () => {
        PostAPI.getAll()
            .then(response =>{
                let locations = [];
                let links = [];
                let titles = [];
                let Posts = response.data
                
                for(let i = 0; i < Posts.length; i++ )
                {
                    locations.push(Posts[i].location)
                    
                }
                
                setMarkers([])
                for(let j = 0; j < locations.length; j++)
                {
                    if(!locationFilterStatus)
                    {
                        if(dateFilterStatus)
                        {
                            
                            if(Posts[j].startTime.split('T')[0] !== dateFilter)
                            {

                            }
                            else
                            {
                                Geocode.fromAddress(locations[j]).then(
                                    async (response) => {
                                      const { lat, lng } = await response.results[0].geometry.location;
            
                                      
                                      setMarkers(current => [...current, {
                                        lat:lat,
                                        lng: lng,
                                        time: new Date(),
                                        startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                        endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                        location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                        title: Posts[j].title == null ? "n/a" : Posts[j].title,
                                        link: Posts[j]._id == null ? "n/a" : Posts[j]._id,
                                        }])})
                            }
                        }else{
                            Geocode.fromAddress(locations[j]).then(
                                async (response) => {
                                  const { lat, lng } = await response.results[0].geometry.location;
                                    
                                  
                                  setMarkers(current => [...current, {
                                    lat:lat,
                                    lng: lng,
                                    time: new Date(),
                                    startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                    endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                    location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                    title: Posts[j].title == null ? "n/a" : Posts[j].title,
                                    link: Posts[j]._id == null ? "n/a" : Posts[j]._id,

                                    }])})
                        }
                    }
                    else
                    {
                        if(locations[j].toLowerCase() !== locationFilter.toLowerCase())
                        {
                            
                        }
                        else if(dateFilterStatus)
                        {
                            if(Posts[j].startTime.split('T')[0] !== dateFilter)
                            {

                            }
                            else
                            {
                                Geocode.fromAddress(locations[j]).then(
                                    async (response) => {
                                      const { lat, lng } = await response.results[0].geometry.location;
            
                                      
                                      setMarkers(current => [...current, {
                                        lat:lat,
                                        lng: lng,
                                        time: new Date(),
                                        startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                        endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                        location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                        title: Posts[j].title == null ? "n/a" : Posts[j].title,
                                        link: Posts[j]._id == null ? "n/a" : Posts[j]._id,

                                        }])})
                            }
                        }
                        else
                        {
                            Geocode.fromAddress(locations[j]).then(
                                async (response) => {
                                  const { lat, lng } = await response.results[0].geometry.location;
                                  console.log("title")
        
                                  console.log(Posts[j].title)
                                  setMarkers(current => [...current, {
                                    lat:lat,
                                    lng: lng,
                                    time: new Date(),
                                    startTime: Posts[j].startTime == null ? "n/a" : Posts[j].startTime,
                                    endTime: Posts[j].endTime  == null ? "n/a" : Posts[j].endTime,
                                    location: Posts[j].location == null ? "n/a" : Posts[j].location,
                                    title: Posts[j].title == null ? "n/a" : Posts[j].title, 
                                    link: Posts[j]._id == null ? "n/a" : Posts[j]._id,
                                    }])})
                        }
                    }
                }
                if(!dateFilterStatus)
                {

                }
                else{
                    
                    let tmpMarkers = markers.filter(marker => marker.startTime.split('T')[0] === dateFilter)
                    
                    setMarkers([])
                }
                
    })}
    
    if(loadError)
        return "Error loading Maps"
    if(!isLoaded)
        return "Loading Maps"
    return(
        <div>
            <NavBar/>
            <MapFilter 
                       locationFilterStatus = {locationFilterStatus} 
                       setLocationFilterStatus = {setLocationFilterStatus}
                       locationFilter = {locationFilter}
                       setLocationFilter = {setLocationFilter}
                       dateFilterStatus = {dateFilterStatus}
                       setDateFilterStatus = {setDateFilterStatus}
                       dateFilter = {dateFilter}
                       setDateFilter = {setDateFilter}
            />
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom = {16}
                center = {center}
                options = {options}
                onLoad = {onMapLoad}
            >
                {markers.map(marker => <Marker key = {marker.time.toISOString()  + marker.startTime}
                                               position = {{lat: marker.lat, lng: marker.lng}}
                                               onClick = {()=>{
                                                   console.log("marker title")
                                                            console.log(marker.title)
                                                            setSelected(marker)
                                                            allowedLAT = marker.lat
                                                            allowedLNG = marker.lng}}
                                               icon = {checkDate(marker.startTime) ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                                                                                     : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'}
                                               
                                        />
                            )
                }

                {
                selected != null ? (
                    <InfoWindow position = {{lat:selected.lat, lng:selected.lng}} 
                                onCloseClick = { () =>{
                                    setSelected(null)
                                    }
                                }
                    >
                        <div>
                            {checkDate(selected.startTime) ? <b>Event Soon!</b> : null}
                            <p>Event: {selected.title}</p>
                            <p>Location: {selected.location}</p>
                            {/* <p>date: {selected.date}</p> */}
                            <p>Start Time: {selected.startTime.split('T')[0]} at {selected.startTime.split('T')[1]}</p>
                            <p>End Time: {selected.endTime.split('T')[0]} at {selected.endTime.split('T')[1]}</p>
                            <Link to={"/post/"+`${selected.link}`}><Button>Go to event</Button></Link> 

                        </div>
                    </InfoWindow>) : null
                }
            </GoogleMap>
        </div>
    )

}
