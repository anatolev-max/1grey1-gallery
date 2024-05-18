const SERVER_STATUS = {
    LOCAL: {
        scheme: 'http',
        host: `localhost:80`
    },
    REMOTE: {
        scheme:'https',
        host: '1grey1-api.webdot.pro'
    }
}

const {scheme, host} = SERVER_STATUS.LOCAL;

const URL = {
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

const APP_STORAGE = {
    ACCESS_TOKEN: `gallery_${btoa('token')}`,
    EFFECTS: `gallery_${btoa('effects')}`,
    PICTURE: `gallery_${btoa('picture')}`
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
    URL,
    APP_STORAGE,
    MODAL_INPUT_SELECTORS
};
