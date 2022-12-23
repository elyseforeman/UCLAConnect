import axios from "axios";

// Used as the basis address for all our api calls
// From https://github.com/beaucarnes/restaurant-reviews/blob/master/frontend/src/http-common.js

export default axios.create({
  baseURL: "http://localhost:5000/api/", 
  headers: {
    "Content-type": "application/json"
  }
});