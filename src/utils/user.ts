import { UserData } from '../interfaces/UserInterfaces';

export const SetUser = (user: UserData) => {
    User = user;
};

export const GetUser = () => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        return null;
    }
    const User: UserData = JSON.parse(userJson);
    return User;
};

export let User: UserData;