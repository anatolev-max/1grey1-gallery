import {renderValidationErrors} from './validation.js';
import {setSignupFormSubmit} from './signup-form.js';
import {setLoginFormSubmit} from './login-form.js';
import {updatePageHeader} from './page-header.js';
import {closeModal} from "./modal";
import {setLogoutBtnClick} from './logout.js';
import {APP_STORAGE} from '../const.js';
import {start} from '../start.js';

setLoginFormSubmit(
    (token) => {
        closeModal();
        localStorage.setItem(APP_STORAGE.ACCESS_TOKEN, JSON.stringify(token));
        updatePageHeader();
        start();
    },
    renderValidationErrors
);
    
setSignupFormSubmit(
    () => {
        closeModal();
        start();
    },
    renderValidationErrors
);

setLogoutBtnClick(() => {
    localStorage.removeItem(APP_STORAGE.ACCESS_TOKEN);
    updatePageHeader();
});
