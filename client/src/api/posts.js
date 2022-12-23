import axios from 'axios';

export default axios.create({
    baseURL: 'ttp://localhost:5000/api/'
});