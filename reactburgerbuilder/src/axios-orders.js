import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://testproject-73caf.firebaseio.com/'

});

export default instance;