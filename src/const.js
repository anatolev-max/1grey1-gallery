import {ServerStatus} from "./enum.js";

const APP_ENV = ServerStatus.GLOBAL;
let scheme;
let host;

if (APP_ENV === ServerStatus.LOCAL){
    const port = 80;
    scheme = 'http';
    host = `localhost:${port}`;
}
if (APP_ENV === ServerStatus.GLOBAL) {
    scheme = 'https';
    host = '1grey1-api.webdot.pro';
}

const Url = {
    ACCESS_TOKEN: {
        POST: `${scheme}://${host}/token`,
        DELETE: `${scheme}://${host}/logout/`
    },
    COMMENT: {
        POST: `${scheme}://${host}/comment`
    },
    EFFECT: {
        GET: `${scheme}://${host}/effect`
    },
    LIKE: {
        POST: `${scheme}://${host}/like`,
        DELETE: `${scheme}://${host}/like/`
    },
    PICTURE: {
        GET: `${scheme}://${host}/picture`,
        POST: `${scheme}://${host}/picture`
    },
    USER: {
        POST: `${scheme}://${host}/user`
    },
    UPLOAD: {
        AVATAR: `${scheme}://${host}/uploads/avatars/`,
        PICTURE: `${scheme}://${host}/uploads/pictures/`
    }
};

const AppStorage = {
    ACCESS_TOKEN: `gallery_${btoa('token')}`,
    EFFECTS: `gallery_${btoa('effects')}`,
    PICTURE: `gallery_${btoa('picture')}`
};

const Filter = {
    DEFAULT: 'default',
    RANDOM: 'random',
    DISCUSSED: 'discussed'
};

const MODAL_INPUT_SELECTORS = [
    '#login-email',
    '#login-password',
    '#signup-email',
    '#signup-password',
    '#signup-username',
    '.text__hashtags',
    '.text__description',
    '.social__footer-text'
];

export {
    Url,
    AppStorage,
    Filter,
    MODAL_INPUT_SELECTORS
};
