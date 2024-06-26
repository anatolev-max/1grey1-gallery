import {blockButton, unblockButton} from './util.js';
import {sendData} from "../api/user/async-api.js";
import {URL} from "../const";

const loginFormElement = document.querySelector('#login-modal form');
const submitBtnElement = loginFormElement.querySelector('[type=submit]');
const LOGIN_FIELDS = ['email', 'password'];

const setLoginFormSubmit = (onSuccess, onFail) => {
    loginFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(loginFormElement);

        blockButton(submitBtnElement, 'Signin in');
        window.setTimeout(() => {
            sendData(URL.ACCESS_TOKEN.POST, formData, false)
                .then(({data, status, errors}) => {
                    if (status === 201) {
                        onSuccess(data);
                    } else {
                        onFail(errors, LOGIN_FIELDS, loginFormElement);
                    }
                })
                .finally(() => {
                    unblockButton(submitBtnElement);
                });
        }, 2000);
    });
};

export {setLoginFormSubmit};
