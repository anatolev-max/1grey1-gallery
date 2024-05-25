import {deleteToken} from '../api/user/fetch-api.js';
import {blockButton, unblockButton} from './util.js';
import {APP_STORAGE, URL} from '../const.js';
import {clearEntityList} from '../util.js';
import {clouseFilterBtnClick} from "../filters.js";

const logoutBtnElement = document.getElementById('logout-btn');
const uploadBtnElement = document.querySelector('.img-upload__label');

const setLogoutBtnClick = (onSuccess) => {
    logoutBtnElement.addEventListener('click', () => {
        if (!localStorage.getItem(APP_STORAGE.ACCESS_TOKEN)){
            return;
        }

        const {id} = JSON.parse(localStorage.getItem(APP_STORAGE.ACCESS_TOKEN));

        blockButton(logoutBtnElement, 'Logout');
        window.setTimeout(() => {
            deleteToken(URL.ACCESS_TOKEN.DELETE + id)
                .then(() => {
                    clearEntityList('.picture');
                    clouseFilterBtnClick();
                    uploadBtnElement.style.opacity = '0';
                    onSuccess();
                })
                .finally(() => {
                    unblockButton(logoutBtnElement);
                });
        }, 2000);
    })
}

export {setLogoutBtnClick};
