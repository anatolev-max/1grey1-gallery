import {APP_STORAGE, URL} from '../const.js';

const userAvatarElement = document.querySelector('.wd-user-avatar');
const userNameElement = document.getElementById('username');

const updatePageHeader = () => {
    const accessToken = localStorage.getItem(APP_STORAGE.ACCESS_TOKEN);
    document.body.dataset.auth = Boolean(accessToken);

    if (accessToken) {
        const user = JSON.parse(accessToken).user;
        userAvatarElement.src = URL.UPLOAD.AVATAR + user.avatar;
        userNameElement.textContent = user.name;
    }

    return Boolean(accessToken);
}

export {updatePageHeader};
