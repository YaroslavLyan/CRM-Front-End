import axios from 'axios'

const token = window.localStorage.getItem('token');

let instance = axios.create({
        baseURL: 'http://localhost:3006/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

export default instance;