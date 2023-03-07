import axios from 'axios';
import { UserData } from '../interfaces/UserInterfaces';
import { urlBack } from '../config-env';

// Get token from local storage and return it
const getToken = () => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        return '';
    }
    const user: UserData = JSON.parse(userJson);
    return user.token;
};

export const api = axios.create({
    baseURL: urlBack
});

export const apiAuth = axios.create({
    baseURL: urlBack,
    headers: {
        'access-token': getToken()
    }
});
