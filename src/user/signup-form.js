import {sendData} from '../api/user/async-api.js';
import {blockButton, unblockButton} from './util.js';
import {URL} from "../const";

const signupFormElement = document.querySelector('#signup-modal form');
const submitBtnElement = signupFormElement.querySelector('[type=submit]');

const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar'];

const setSignupFormSubmit = (onSuccess, onFail) => {
    signupFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(signupFormElement);

        blockButton(submitBtnElement, 'Registration');
        window.setTimeout(() => {
            sendData(URL.USER.POST, formData, false)
                .then(({status, errors}) => {
                    if (status === 201) {
                        onSuccess();
                    } else {
                        onFail(errors, SIGNUP_FIELDS, signupFormElement);
                    }
                })
                .finally(() => {
                    unblockButton(submitBtnElement);
                });
        }, 2000);
    });
}


export {setSignupFormSubmit};
