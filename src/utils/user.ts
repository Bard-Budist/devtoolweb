import { UserData } from '../interfaces/UserInterfaces';

export const SetUser = (user: UserData) => {
    User = user;
};

export let User: UserData;