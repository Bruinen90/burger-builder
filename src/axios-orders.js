import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-ee6f4.firebaseio.com/'
});

export default instance;
