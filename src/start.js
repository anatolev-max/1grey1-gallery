import {updatePageHeader} from './user/page-header.js';
import {renderEffectsList} from './effect-list.js';
import {renderPicturesList} from './picture-list.js';
import {URL, APP_STORAGE} from './const.js';
import {setFilterBtnClick} from "./filters";
import {checkMobileVersion} from "./util";
import {getDataArray} from "./api/base/async-api";

const BLOCK_MESSAGE = 'Login from the computer version!';

const start = () => {
    if (checkMobileVersion()) {
        document.body.innerHTML = '';
        window.setTimeout(() => {
            alert(BLOCK_MESSAGE);
        },0);
        return;
    }
    if (updatePageHeader()) {
        getDataArray([URL.PICTURE.GET, URL.EFFECT.GET])
            .then((response) => {
                const data = response.dats.get('effect');
                localStorage.setItem(APP_STORAGE.EFFECTS, JSON.stringify(data));
                renderEffectsList();
                return response
            })
            .then((response) => {
                const data = response.dats.get('picture');
                renderPicturesList(data);
                setFilterBtnClick();
        });
        document.querySelector('.img-upload__label').style.opacity = '1';
    }
}

export {start};
