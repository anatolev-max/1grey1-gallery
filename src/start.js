import {updatePageHeader} from './user/page-header.js';
import {renderEffectsList} from './effect-list.js';
import {renderPicturesList} from './picture-list.js';
import {URL, APP_STORAGE} from './const.js';
import {setFilterBtnClick} from "./filters";
import {checkMobileVersion} from "./util";
import {sendFetchRequest} from "./api/base/async-api";
import {HttpMethod} from "./enum";

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
        sendFetchRequest(URL.EFFECT.GET, HttpMethod.GET)
            .then((effects) => {
                const data = effects.data;
                localStorage.setItem(APP_STORAGE.EFFECTS, JSON.stringify(data));
                renderEffectsList();
            });

        sendFetchRequest(URL.PICTURE.GET, HttpMethod.GET)
            .then((pictures) => {
                const data = pictures.data;
                renderPicturesList(data);
                setFilterBtnClick();
            });
    document.querySelector('.img-upload__label').style.opacity = '1';
    }
}

export {start};
