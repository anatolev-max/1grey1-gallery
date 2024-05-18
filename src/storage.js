import {APP_STORAGE} from './const.js';

const getUser = () => {
    const token = localStorage.getItem(APP_STORAGE.ACCESS_TOKEN);
    return JSON.parse(token).user;
}

const getCurrentPicture = () => {
    return JSON.parse(localStorage.getItem(APP_STORAGE.PICTURE));
}

export {
    getUser,
    getCurrentPicture
};
