/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/base/fetch-api.js":
/*!***********************************!*\
  !*** ./src/api/base/fetch-api.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteData: () => (/* binding */ deleteData),
/* harmony export */   sendFetchRequest: () => (/* binding */ sendFetchRequest)
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const */ "./src/const.js");
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enum */ "./src/enum.js");



const getToken = () => {
    if (!localStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)){
        return;
    }

    return JSON.parse(localStorage.getItem(_const__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)).token;
}

const getOptions = (httpMethod = _enum__WEBPACK_IMPORTED_MODULE_1__.HttpMethod.GET, body = null) => {
    return  {
        method: httpMethod,
        headers: {
            Authorization: `Basic ${btoa(getToken() + ':')}`
        },
        body
    };
}

const sendFetchRequest = (url, method, body) => {
    let resp;

    return fetch(url, getOptions(method, body))
        .then((response) => {
            resp = response;
            return response.json();
        })
        .then((data) => {
            const errors = !resp.ok && method === _enum__WEBPACK_IMPORTED_MODULE_1__.HttpMethod.POST
                ? JSON.parse(resp.headers.get('Errors'))
                : null;
            return {
                data: resp.ok ? data : null,
                status: resp.status,
                errors
            };
        });
}

const deleteData = (url) => {
    let resp;

    return fetch(url, getOptions(_enum__WEBPACK_IMPORTED_MODULE_1__.HttpMethod.DELETE))
        .then((response) => {
            resp = response;
            return response;
        })
        .then((data) => {
            return {
                data: resp.ok ? data : null,
                status: resp.status,
                errors: null
            };
        });
}




/***/ }),

/***/ "./src/api/user/fetch-api.js":
/*!***********************************!*\
  !*** ./src/api/user/fetch-api.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteToken: () => (/* binding */ deleteToken),
/* harmony export */   sendData: () => (/* binding */ sendData)
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const */ "./src/const.js");


const sendData = (url, body) => {
    let resp;

    return fetch(url, {
        method: 'POST',
        body
    })
        .then((response) => {
            resp = response;
            return response.json();
        })
        .then((data) => {
            return {
                data: resp.ok ? data : null,
                status: resp.status,
                errors: resp.ok ? null : JSON.parse(resp.headers.get('Errors'))
            };
        });
};

const deleteToken = (token, tokenId) => {
    let resp;

    return fetch(`${_const__WEBPACK_IMPORTED_MODULE_0__.Url.ACCESS_TOKEN.DELETE}${tokenId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${btoa(token + ':')}`
        }
    })
        .then((response) => {
            resp = response;
            return response;
        })
        .then((data) => {
            return {
                data: resp.ok ? data : null,
                status: resp.status,
                errors: null
            };
        });
}




/***/ }),

/***/ "./src/comment-form.js":
/*!*****************************!*\
  !*** ./src/comment-form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setCommentFormSabmit: () => (/* binding */ setCommentFormSabmit)
/* harmony export */ });
/* harmony import */ var _user_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/util.js */ "./src/user/util.js");
/* harmony import */ var _api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/base/fetch-api.js */ "./src/api/base/fetch-api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enum */ "./src/enum.js");





const commentFormElement = document.querySelector('#comment-form');
const submitBtnElement = commentFormElement.querySelector('[type=submit]');
const commentInputElement = commentFormElement.querySelector('.social__footer-text');

const setCommentFormSabmit = (onSuccess, onFail) => {
    commentFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));
        const picture = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.PICTURE));

        const formData = new FormData(commentFormElement);
        formData.set('user_id', user.id);
        formData.set('picture_id', picture.id);

        (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement, 'Отправка');
        window.setTimeout(() => {
            (0,_api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_1__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_2__.Url.COMMENT.POST, _enum__WEBPACK_IMPORTED_MODULE_3__.HttpMethod.POST ,formData)
                .then(() => {
                    onSuccess(picture.id);
                    commentInputElement.value = '';
                    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
                })
                .catch(() => {
                    onFail();
                });
        }, 500);
    });
};




/***/ }),

/***/ "./src/comment-list.js":
/*!*****************************!*\
  !*** ./src/comment-list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCommentList: () => (/* binding */ renderCommentList)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _user_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user/util.js */ "./src/user/util.js");




const totalCommentCountElement = document.querySelector('.comments-count');
const renderedCommentCountElement = document.querySelector('.comments-count--rendered');
const showMoreButtonElement = document.querySelector('.social__comments-loader');
const commentListElement = document.querySelector('.social__comments');
const commentTemlate = document.getElementById('comment')
    .content
    .querySelector('.social__comment');

const COMMENT_COUNT_PER_STEP = 5;

const setLoaderClick = function (comments) {
    if (this.onLoaderClick !== undefined) {
        showMoreButtonElement.removeEventListener('click', this.onLoaderClick);
    }

    this.onLoaderClick = () => {
        (0,_user_util_js__WEBPACK_IMPORTED_MODULE_2__.blockButton)(showMoreButtonElement, ' ', false);
        window.setTimeout(()=>{
            (0,_user_util_js__WEBPACK_IMPORTED_MODULE_2__.unblockButton)(showMoreButtonElement);
            renderComments(comments, renderedCommentCount, renderedCommentCount + COMMENT_COUNT_PER_STEP);
            renderedCommentCount += COMMENT_COUNT_PER_STEP;

            if (renderedCommentCount >= comments.length) {
                showMoreButtonElement.classList.add('hidden');
            }
        }, 1000);

    };

    let renderedCommentCount = 5;
    showMoreButtonElement.addEventListener('click', this.onLoaderClick);
}

const renderComments = (comments, from, to) => {
    for (const {message, user} of comments.slice(from, to)) {
        const commentElement = commentTemlate.cloneNode(true);
        commentElement.querySelector('.social__text').textContent = message;
        commentElement.querySelector('.social__picture').src = _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.UPLOAD.AVATAR + user.avatar;
        commentListElement.append(commentElement);
        renderedCommentCountElement.textContent = String((+renderedCommentCountElement.textContent) + 1);
    }
};

const renderCommentList = (comments) => {
    (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearEntityList)('.social__comment');

    const to = Math.min(comments.length, COMMENT_COUNT_PER_STEP);

    renderComments(comments, 0, to);
    totalCommentCountElement.textContent = String(comments.length);
    renderedCommentCountElement.textContent = String(to);

    if (comments.length > COMMENT_COUNT_PER_STEP) {
        showMoreButtonElement.classList.remove('hidden');
    } else {
        showMoreButtonElement.classList.add('hidden');
    }

    setLoaderClick.call(renderCommentList, comments);
};




/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppStorage: () => (/* binding */ AppStorage),
/* harmony export */   Filter: () => (/* binding */ Filter),
/* harmony export */   MODAL_INPUT_SELECTORS: () => (/* binding */ MODAL_INPUT_SELECTORS),
/* harmony export */   Url: () => (/* binding */ Url)
/* harmony export */ });
// const scheme = 'http';
// const port = 80;
// const host = `localhost:${port}`;

const scheme = 'https';
const host = '1grey1-api.webdot.pro';

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




/***/ }),

/***/ "./src/effect-list.js":
/*!****************************!*\
  !*** ./src/effect-list.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderEffectsList: () => (/* binding */ renderEffectsList)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");



const effectListElement = document.querySelector('.effects__list');
const effectTemlate = document.getElementById('effect-item')
    .content
    .querySelector('.effects__item');

const renderEffectsList = () => {
    const effects = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.EFFECTS));
    (0,_util__WEBPACK_IMPORTED_MODULE_1__.clearEntityList)('.effects__item');

    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)) {
        return;
    }

    for (const {name: effectName, id: effectId} of effects) {
        const effectElement = effectTemlate.cloneNode(true);

        if (effectName === 'none') {
            effectElement.querySelector('.effects__radio').setAttribute('checked', '');
        }

        effectElement.querySelector('.effects__radio').setAttribute('id', `effect-${effectName}`);
        effectElement.querySelector('.effects__label').setAttribute('for', `effect-${effectName}`);
        effectElement.querySelector('.effects__radio').setAttribute('value', effectId);
        effectElement.querySelector('.effects__preview').classList.add(`effects__preview--${effectName}`);
        effectListElement.append(effectElement);
    }
};




/***/ }),

/***/ "./src/effects.js":
/*!************************!*\
  !*** ./src/effects.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onEffectsRadioChange: () => (/* binding */ onEffectsRadioChange),
/* harmony export */   onSliderUpdate: () => (/* binding */ onSliderUpdate),
/* harmony export */   setImageEffect: () => (/* binding */ setImageEffect)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const EFFECTS = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.EFFECTS));
const effectLevelElement = document.querySelector('.effect-level')
const effectLevelSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const previewImgElement = document.querySelector('.img-upload__preview img');

const NONE_EFFECT_KEY = 'none';

if (noUiSlider) {
    noUiSlider.create(effectLevelSliderElement, {
        range: {
            min: 0,
            max: 100
        },
        start: 50,
        step: 1,
        connect: 'lower',
        format: {
            to: function (value) {
                if (Number.isInteger(value)) {
                    return value.toFixed(0);
                }
                return value.toFixed(1);
            },
            from: function (value) {
                return parseFloat(value);
            }
        }
    });
}

const onSliderUpdate = (_, handle, unencoded) => {
    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)) {
        return;
    }

    const effectName = document.querySelector('[name=effect_id]:checked').getAttribute('id').split('-')[1];
    const effect = EFFECTS.find((effect) => effect.name === effectName);

    if (effectName !== NONE_EFFECT_KEY) {
        const filterValue = `${effect.css_filter}(${unencoded[handle] + (effect.unit ?? '')})`;
        effectLevelValueElement.setAttribute('value', unencoded[handle]);
        previewImgElement.style.filter = filterValue;
    }
}

const onEffectsRadioChange = (evt) => {
    if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN)) {
        return;
    }

    const effectName = evt.target.getAttribute('id').split('-')[1];
    const effect = EFFECTS.find(effect => effect.name === effectName);

    previewImgElement.setAttribute('class', '');
    previewImgElement.classList.add('class', `effects__preview--${effectName}`);

    if (effect.name !== NONE_EFFECT_KEY) {
        const options = {
            range: {
                min: effect.range_min,
                max: effect.range_max
            },
            step: effect.step
        };
        effectLevelElement.classList.remove('hidden');
        effectLevelSliderElement.noUiSlider.updateOptions(options);
        effectLevelSliderElement.noUiSlider.set(effect.start);
    } else {
        effectLevelElement.classList.add('hidden');
        effectLevelValueElement.setAttribute('value', '');
        previewImgElement.style.filter = 'unset';
    }
}

const setImageEffect = (pictureElement, picture) => {
    const effects = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.EFFECTS));
    const filter = effects.find((effect) => effect.id === picture.effect_id);
    const pictureImgElement = pictureElement.querySelector('img');
    if (picture.effect_level !== null) {
        pictureImgElement.style.filter = `${filter.css_filter}(${picture.effect_level}${filter.unit ?? ''})`;
    }else {
        pictureImgElement.style.filter = '';
    }
}




/***/ }),

/***/ "./src/enum.js":
/*!*********************!*\
  !*** ./src/enum.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpMethod: () => (/* binding */ HttpMethod),
/* harmony export */   MessageType: () => (/* binding */ MessageType)
/* harmony export */ });
const MessageType = {
    ERROR: 'error',
    SUCCESS: 'success'
};

const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE'
};




/***/ }),

/***/ "./src/filters.js":
/*!************************!*\
  !*** ./src/filters.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clouseFilterBtnClick: () => (/* binding */ clouseFilterBtnClick),
/* harmony export */   setFilterBtnClick: () => (/* binding */ setFilterBtnClick)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _picture_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./picture-list.js */ "./src/picture-list.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");




const filterList = document.querySelector('.img-filters--inactive');
const filtersFormElement = document.querySelector('.img-filters__form');

const ubdateBtnClassList = (buttonId) => { 
    Object.values(_const_js__WEBPACK_IMPORTED_MODULE_2__.Filter).forEach((idFilter) => {
        document
            .querySelector(`#filter-${idFilter}`)
            .className = 'img-filters__button';
    });

    document
        .querySelector(`#${buttonId}`)
        .classList.add('img-filters__button--active'); 
}

const randomPictureArray = (pictures) => {
    const uniqueObject = new Set();

    while (Array.from(uniqueObject).length !== pictures.length) {
        uniqueObject.add((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(pictures));
    }

    return Array.from(uniqueObject);
};

const filterBtnClick = (evt) => {
    const filterName = evt.target.id.split('-')[1];
    ubdateBtnClassList(evt.target.id);

    switch (filterName) {
        case _const_js__WEBPACK_IMPORTED_MODULE_2__.Filter.DEFAULT:
            (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.renderPicturesList)(_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.pictures.sort((a, b) => a.id - b.id), true);
            break;

        case _const_js__WEBPACK_IMPORTED_MODULE_2__.Filter.RANDOM:
            (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.renderPicturesList)(randomPictureArray(_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.pictures), true);
            break;

        case _const_js__WEBPACK_IMPORTED_MODULE_2__.Filter.DISCUSSED:
            (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.renderPicturesList)(_picture_list_js__WEBPACK_IMPORTED_MODULE_1__.pictures.sort((a, b) => b.comments.length - a.comments.length), true);
            break;
    }
}

const setFilterBtnClick = () => {
    filterList.style = 'opacity: 1';
    filtersFormElement.addEventListener('click', filterBtnClick);
}

const clouseFilterBtnClick = () => {
    filterList.style = 'opacity: 0';
    filtersFormElement.removeEventListener('click', filterBtnClick);
}




/***/ }),

/***/ "./src/hashtag.js":
/*!************************!*\
  !*** ./src/hashtag.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showPictureHastags: () => (/* binding */ showPictureHastags)
/* harmony export */ });
const showPictureHastags = (hashtags) => {
    const message = hashtags.length ? `: ${hashtags.join(', ')}` : ' отсутствуют';
    alert(`Хештаги${message}`);
};




/***/ }),

/***/ "./src/likes.js":
/*!**********************!*\
  !*** ./src/likes.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setLikesCountClick: () => (/* binding */ setLikesCountClick),
/* harmony export */   updateLikesCount: () => (/* binding */ updateLikesCount)
/* harmony export */ });
/* harmony import */ var _user_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/util.js */ "./src/user/util.js");
/* harmony import */ var _api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/base/fetch-api */ "./src/api/base/fetch-api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enum */ "./src/enum.js");






const submitBtnElement = document.querySelector('.likes-count');
const previewModalLikesElement = document.querySelector('.likes-count');

const getLike = (likes, userId, pictureId) => {
    return likes.find((like) => {
        return (like.user_id === userId) && (like.picture_id === pictureId);
    })
};

const updateLikesCount = (likes) => {
    previewModalLikesElement.textContent = likes.length;
    const picture = JSON.parse(localStorage.getItem('gallery_cGljdHVyZQ=='));
    const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));

    if (getLike(picture.likes, user.id, picture.id)) {
        submitBtnElement.classList.add('likes-count--active');
    } else {
        submitBtnElement.classList.remove('likes-count--active');
    }
}

const setLike = (onSuccess, userId, pictureId) => {
    const formData = new FormData();
    formData.set('user_id', userId);
    formData.set('picture_id', pictureId);
    
    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement, '');
    window.setTimeout(() => {
        (0,_api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_1__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_2__.Url.LIKE.POST, _enum__WEBPACK_IMPORTED_MODULE_3__.HttpMethod.POST, formData)
            .then(() => {
                onSuccess();
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            })
            .catch(() => {
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            })
    }, 500);
}

const removeLike = (onSuccess, likeId) => {
    ;(0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement, '');

    window.setTimeout(() => {
        (0,_api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_1__.deleteData)(_const_js__WEBPACK_IMPORTED_MODULE_2__.Url.LIKE.DELETE + likeId)
            .then(() => {
                onSuccess();
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            })
            .catch(() => {
                (0,_user_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
            })
    }, 500)
}

const setLikesCountClick = (onSuccess) => {
    submitBtnElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));
        const picture = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.PICTURE));

        if (getLike(picture.likes, user.id, picture.id)) {
            const likeId = picture.likes.find(like => like.user_id === user.id).id;
            removeLike(
                () => {
                    onSuccess(picture.id);
                },
                likeId
            );
        } else {
            setLike(
                () => {
                    onSuccess(picture.id);
                },
                user.id,
                picture.id
            );
        }
    });

};




/***/ }),

/***/ "./src/message.js":
/*!************************!*\
  !*** ./src/message.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderProgressBar: () => (/* binding */ renderProgressBar)
/* harmony export */ });
const loaderTemplate = document.getElementById('messages')
    .content
    .querySelector('.img-upload__message');
const modalBackdropTemplate = document.getElementById('modal-backdrop')
    .content
    .querySelector('.modal-backdrop');

const PROGRESS_BAR_TRANSITION = 2000;
document.documentElement.style.setProperty('--progress-bar-transition', `${PROGRESS_BAR_TRANSITION}ms`);

const renderMessage = (type, callback) => {
    const messageElement = document.getElementById(type)
        .content
        .querySelector(`.${type}`)
        .cloneNode(true);
    const btnElement = messageElement.querySelector(`.${type}__button`);

    btnElement.addEventListener('click', removeMassages);
    document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
    document.body.append(messageElement);
    callback();
};

const removeMassages = () => {
    document.querySelectorAll('.message')
        .forEach((messageElement) => {
            messageElement.querySelector('button').removeEventListener('click', removeMassages);
            messageElement.remove();
        });
    document.querySelectorAll('.modal-backdrop')
        .forEach((backdropElement) => backdropElement.remove());
};

const renderProgressBar = (type, callback) => {
    const modalBackdropElement = modalBackdropTemplate.cloneNode(true);
    const loaderElement = loaderTemplate.cloneNode(true);
    const progressBarElement = loaderElement.querySelector('.progress-bar');

    document.body.append(loaderElement);
    loaderElement.insertAdjacentElement('beforebegin', modalBackdropElement);
    modalBackdropElement.style.zIndex = '1';

    window.setTimeout(() => {
        progressBarElement.style.width = '100%';

        window.setTimeout(() => {
            loaderElement.remove();
            renderMessage(type, callback);
        }, PROGRESS_BAR_TRANSITION);
    }, 100);
};




/***/ }),

/***/ "./src/modal-util.js":
/*!***************************!*\
  !*** ./src/modal-util.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getModalEscKeydownHandler: () => (/* binding */ getModalEscKeydownHandler),
/* harmony export */   onModalOverlayClick: () => (/* binding */ onModalOverlayClick)
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/const.js");


const getModalEscKeydownHandler = (callBack) => {
    return (evt) => {
        const isFocus = _const__WEBPACK_IMPORTED_MODULE_0__.MODAL_INPUT_SELECTORS.find((selector) => {
            return document.activeElement.matches(selector);
        });

        if (evt.code === 'Escape' && !isFocus) {
            callBack();
        }
    }
};

const onModalOverlayClick = (callBack, className) => {
    return (evt) => {
        if (!evt.target.closest(`.${className}`) && className !=='img-upload__overlay') {
            callBack();
        } else if (evt.target.className === 'img-upload__overlay') {
            callBack();
        }
    }
}



/***/ }),

/***/ "./src/picture-list.js":
/*!*****************************!*\
  !*** ./src/picture-list.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pictures: () => (/* binding */ pictures),
/* harmony export */   renderPicturesList: () => (/* binding */ renderPicturesList),
/* harmony export */   updatePicture: () => (/* binding */ updatePicture)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _preview_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preview-modal.js */ "./src/preview-modal.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effects.js */ "./src/effects.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");




let pictures = [];
let lengthArray = 26;
const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

const updatePictureCounters = (pictureElement, {likes, comments}) => {
    pictureElement.querySelector('.picture__likes').textContent = likes.length;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
};

const onPictureElementClick = (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
        const picture = pictures.find(picture => picture.id === +pictureElement.dataset.id);
        (0,_preview_modal_js__WEBPACK_IMPORTED_MODULE_1__.openPreviewModal)(picture);
    }
};

const renderPicturesList = (array, sort = false) => {
    if (sort) {
        (0,_util__WEBPACK_IMPORTED_MODULE_3__.clearEntityList)('.picture');
    }

    pictures = array;

    for (const picture of pictures.slice(lengthArray-26, lengthArray)) {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.dataset.id = picture.id;

        pictureElement.querySelector('.picture__img').setAttribute('src', _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.UPLOAD.PICTURE + picture.url);
        updatePictureCounters(pictureElement, picture);
        (0,_effects_js__WEBPACK_IMPORTED_MODULE_2__.setImageEffect)(pictureElement, picture);
        pictureListElement.append(pictureElement);
    }

    pictureListElement.addEventListener('click', onPictureElementClick);
};

const updatePicture = (picture) => {
    const pictureElement = document.querySelector(`.picture[data-id="${picture.id}"]`);

    if (pictureElement) {
        updatePictureCounters(pictureElement, picture);
    }
};

window.addEventListener('scroll', function() {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    if ((windowRelativeBottom < document.documentElement.clientHeight + 100) && (pictures.length >= lengthArray)) {
        lengthArray += 26;
        renderPicturesList(pictures);
    }

});




/***/ }),

/***/ "./src/preview-modal.js":
/*!******************************!*\
  !*** ./src/preview-modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   openPreviewModal: () => (/* binding */ openPreviewModal)
/* harmony export */ });
/* harmony import */ var _comment_list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment-list.js */ "./src/comment-list.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _likes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./likes.js */ "./src/likes.js");
/* harmony import */ var _hashtag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hashtag.js */ "./src/hashtag.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./effects.js */ "./src/effects.js");
/* harmony import */ var _modal_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal-util */ "./src/modal-util.js");








const previewModalElement = document.querySelector('.big-picture');
const previewModalCloseElement = document.getElementById('picture-cancel');
const userAvatarElement = previewModalElement.querySelector('#comment-form .social__picture');
const previewAvatarElement = document.querySelector('.social__picture');
const previewModalImgElement = previewModalElement.querySelector('.big-picture__img img');
const totalCommentCountElement = previewModalElement.querySelector('.comments-count');
const previewModalDescElement = previewModalElement.querySelector('.social__caption');
const hashtagBtnElement = previewModalElement.querySelector('.hashtag-btn');

const onModalEscKeydown = (0,_modal_util__WEBPACK_IMPORTED_MODULE_6__.getModalEscKeydownHandler)(closePreviewModal);
const onOverlayClick = (0,_modal_util__WEBPACK_IMPORTED_MODULE_6__.onModalOverlayClick)(closePreviewModal, 'big-picture__preview');

const onHashtagBtnClick = () => {
    const {hashtags} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_1__.AppStorage.PICTURE));
    (0,_hashtag_js__WEBPACK_IMPORTED_MODULE_4__.showPictureHastags)(hashtags.map(hashtag => hashtag.name));
}

const openPreviewModal = (picture) => {
    localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_1__.AppStorage.PICTURE, JSON.stringify(picture));
    (0,_effects_js__WEBPACK_IMPORTED_MODULE_5__.setImageEffect)(previewModalElement, picture);
    (0,_likes_js__WEBPACK_IMPORTED_MODULE_3__.updateLikesCount)(picture.likes);

    // previewModalImgElement.setAttribute('src', Url.UPLOAD.PICTURE + picture.url);
    previewModalImgElement.src = _const_js__WEBPACK_IMPORTED_MODULE_1__.Url.UPLOAD.PICTURE + picture.url;
    totalCommentCountElement.textContent = picture.comments;
    previewModalDescElement.textContent = picture.description;

    previewAvatarElement.src = _const_js__WEBPACK_IMPORTED_MODULE_1__.Url.UPLOAD.AVATAR + picture.user.avatar;
    userAvatarElement.src = _const_js__WEBPACK_IMPORTED_MODULE_1__.Url.UPLOAD.AVATAR + (0,_storage_js__WEBPACK_IMPORTED_MODULE_2__.getUser)().avatar;
    (0,_comment_list_js__WEBPACK_IMPORTED_MODULE_0__.renderCommentList)(picture.comments);

    previewModalElement.classList.remove('hidden');
    previewModalCloseElement.addEventListener('click', closePreviewModal);
    previewModalElement.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onModalEscKeydown);
    hashtagBtnElement.addEventListener('click', onHashtagBtnClick);
};

function closePreviewModal() {
    previewModalElement.classList.add('hidden');
    previewModalCloseElement.removeEventListener('click', closePreviewModal);
    previewModalElement.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onModalEscKeydown);
    hashtagBtnElement.removeEventListener('click', onHashtagBtnClick);
}




/***/ }),

/***/ "./src/start.js":
/*!**********************!*\
  !*** ./src/start.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   start: () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var _user_page_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/page-header.js */ "./src/user/page-header.js");
/* harmony import */ var _effect_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect-list.js */ "./src/effect-list.js");
/* harmony import */ var _picture_list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./picture-list.js */ "./src/picture-list.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filters */ "./src/filters.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _api_base_fetch_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api/base/fetch-api */ "./src/api/base/fetch-api.js");
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enum */ "./src/enum.js");









const BLOCK_MESSAGE = 'Login from the computer version!';

const start = () => {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_5__.checkMobileVersion)()) {
        document.body.innerHTML = '';
        window.setTimeout(() => {
            alert(BLOCK_MESSAGE);
        },0);
        return;
    }
    if ((0,_user_page_header_js__WEBPACK_IMPORTED_MODULE_0__.updatePageHeader)()) {
        (0,_api_base_fetch_api__WEBPACK_IMPORTED_MODULE_6__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_3__.Url.EFFECT.GET, _enum__WEBPACK_IMPORTED_MODULE_7__.HttpMethod.GET)
            .then((effects) => {
                const data = effects.data;
                localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_3__.AppStorage.EFFECTS, JSON.stringify(data));
                (0,_effect_list_js__WEBPACK_IMPORTED_MODULE_1__.renderEffectsList)();
            });

        (0,_api_base_fetch_api__WEBPACK_IMPORTED_MODULE_6__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_3__.Url.PICTURE.GET, _enum__WEBPACK_IMPORTED_MODULE_7__.HttpMethod.GET)
            .then((pictures) => {
                const data = pictures.data;
                (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_2__.renderPicturesList)(data);
                (0,_filters__WEBPACK_IMPORTED_MODULE_4__.setFilterBtnClick)();
            });
    document.querySelector('.img-upload__label').style.opacity = '1';
    }
}




/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentPicture: () => (/* binding */ getCurrentPicture),
/* harmony export */   getUser: () => (/* binding */ getUser)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const getUser = () => {
    const token = localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN);
    return JSON.parse(token).user;
}

const getCurrentPicture = () => {
    return JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.PICTURE));
}




/***/ }),

/***/ "./src/upload-form.js":
/*!****************************!*\
  !*** ./src/upload-form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onDescTextareaInput: () => (/* binding */ onDescTextareaInput),
/* harmony export */   onHashtagsInput: () => (/* binding */ onHashtagsInput),
/* harmony export */   setUploadFormSubmit: () => (/* binding */ setUploadFormSubmit)
/* harmony export */ });
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.js */ "./src/validation.js");
/* harmony import */ var _user_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user/util.js */ "./src/user/util.js");
/* harmony import */ var _api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/base/fetch-api.js */ "./src/api/base/fetch-api.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enum */ "./src/enum.js");






const MAX_DESCRIPTION_LENGTH = 400;
const uploadFormElement = document.querySelector('#upload-select-image');
const submitBtnElement = uploadFormElement.querySelector('[type=submit]');

/**
 * Обработчик события INPUT к полю описания публикации
 * @param {InputEvent} evt Объект события
 * @return {undefined}
 */
const onDescTextareaInput = (evt) => {
    const valueLength = evt.target.value.length;
    let error = '';

    if (valueLength > MAX_DESCRIPTION_LENGTH) {
        error = `Удалите лишние ${valueLength - MAX_DESCRIPTION_LENGTH} симв.`;
    }

    evt.target.setCustomValidity(error);
    evt.target.reportValidity();
};

const onHashtagsInput = (evt) => {
    const errors = new Set();
    const uniqueHashtags = new Set();

    const errorAddition = {};
    errorAddition[_validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[3]] = null;
    errorAddition[_validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[5]] = null;

    for (const hashtag of evt.target.value.split(' ')) {
        if (hashtag === '') {
            continue;
        }

        for (const validator of _validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATORS) {
            const args = [hashtag, uniqueHashtags, errorAddition];
            if (validator.callback.apply(validator, args)) {
                errors.add(validator.error);
            }
        }
    }

    const resultErrors = [];

    for (const error of errors) {
        if ([_validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[3], _validation_js__WEBPACK_IMPORTED_MODULE_0__.VALIDATION_ERROR_KEYS[5]].includes(error)) {
            resultErrors.push(error + errorAddition[error])
        } else {
            resultErrors.push(error);
        }
    }

    evt.target.setCustomValidity(resultErrors.join('\n'));
    evt.target.reportValidity();
};

const setUploadFormSubmit = (onSuccess, onFail) => {
    uploadFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_3__.AppStorage.ACCESS_TOKEN)) {
            return;
        }

        const {user} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_3__.AppStorage.ACCESS_TOKEN));

        const formData = new FormData(uploadFormElement);
        formData.set('user_id', user.id);

        (0,_user_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(submitBtnElement, 'Публикация', false);
        window.setTimeout(() => {
            (0,_api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_2__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_3__.Url.PICTURE.POST, _enum__WEBPACK_IMPORTED_MODULE_4__.HttpMethod.POST, formData)
                .then(() => {
                    (0,_user_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                    onSuccess();
                })
                .catch(() => {
                    onFail();
                })
;
        }, 0);
    })
};




/***/ }),

/***/ "./src/upload-modal.js":
/*!*****************************!*\
  !*** ./src/upload-modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeUploadModal: () => (/* binding */ closeUploadModal)
/* harmony export */ });
/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ "./src/zoom.js");
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effects.js */ "./src/effects.js");
/* harmony import */ var _upload_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-form.js */ "./src/upload-form.js");
/* harmony import */ var _user_page_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user/page-header */ "./src/user/page-header.js");
/* harmony import */ var _modal_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal-util */ "./src/modal-util.js");






const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalOpenElement = document.getElementById('upload-file');
const uploadModalCloseElement = document.getElementById('upload-cancel');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const effectPreviewElements = document.getElementsByClassName('effects__item');
const effectListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const hashtagsInput = uploadModalElement.querySelector('.text__hashtags');
const descriptionTextarea = uploadModalElement.querySelector('.text__description');

const onModalEscKeydown = (0,_modal_util__WEBPACK_IMPORTED_MODULE_4__.getModalEscKeydownHandler)(closeUploadModal);
const onOverlayClick = (0,_modal_util__WEBPACK_IMPORTED_MODULE_4__.onModalOverlayClick)(closeUploadModal, 'img-upload__overlay');

const updateUploadPreview = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        previewImgElement.setAttribute('src', reader.result);
        for (const previewElement of effectPreviewElements) {
            previewElement.querySelector('.effects__preview').style.backgroundImage = `url(${reader.result})`;
        }
    });

    reader.readAsDataURL(file);
};

const handlers = [
    {
        element: uploadModalCloseElement,
        event: 'click',
        callback: closeUploadModal
    },
    {
        element: uploadModalElement,
        event: 'click',
        callback: onOverlayClick
    },
    {
        element: document,
        event: 'keydown',
        callback: onModalEscKeydown
    },
    {
        element: scaleControlBiggerElement,
        event: 'click',
        callback: _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomPlus
    },
    {
        element: scaleControlSmallerElement,
        event: 'click',
        callback: _zoom_js__WEBPACK_IMPORTED_MODULE_0__.zoomMinus
    },
    {
        element: effectListElement,
        event: 'change',
        callback: _effects_js__WEBPACK_IMPORTED_MODULE_1__.onEffectsRadioChange
    },
    {
        element: hashtagsInput,
        event: 'input',
        callback: _upload_form_js__WEBPACK_IMPORTED_MODULE_2__.onHashtagsInput
    },
    {
        element: descriptionTextarea,
        event: 'input',
        callback: _upload_form_js__WEBPACK_IMPORTED_MODULE_2__.onDescTextareaInput
    }
];

function openUploadModal(file) {
    updateUploadPreview(file);
    uploadModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    for (const {element, event, callback} of handlers) {
        element.addEventListener(event, callback);
    }

    effectLevelSliderElement.noUiSlider.on('update', _effects_js__WEBPACK_IMPORTED_MODULE_1__.onSliderUpdate);
}

function closeUploadModal() {
    uploadModalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    for (const {element, event, callback} of handlers) {
        element.removeEventListener(event, callback);
    }
    effectLevelSliderElement.noUiSlider.off('update');
    uploadModalOpenElement.value = '';
}

uploadModalOpenElement.addEventListener('change', () => {
    const file = uploadModalOpenElement.files[0];
    if ((0,_user_page_header__WEBPACK_IMPORTED_MODULE_3__.updatePageHeader)()) {
        openUploadModal(file);
    }
});




/***/ }),

/***/ "./src/user/login-form.js":
/*!********************************!*\
  !*** ./src/user/login-form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setLoginFormSubmit: () => (/* binding */ setLoginFormSubmit)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/user/util.js");
/* harmony import */ var _api_user_fetch_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/user/fetch-api */ "./src/api/user/fetch-api.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");




const loginFormElement = document.querySelector('#login-modal form');
const submitBtnElement = loginFormElement.querySelector('[type=submit]');
const LOGIN_FIELDS = ['email', 'password'];

const setLoginFormSubmit = (onSuccess, onFail) => {
    loginFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(loginFormElement);

        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.blockButton)(submitBtnElement, 'Signin in');
        window.setTimeout(() => {
            (0,_api_user_fetch_api__WEBPACK_IMPORTED_MODULE_1__.sendData)(_const__WEBPACK_IMPORTED_MODULE_2__.Url.ACCESS_TOKEN.POST, formData)
                .then(({data, status, errors}) => {
                    if (status === 201) {
                        onSuccess(data);
                    } else {
                        onFail(errors, LOGIN_FIELDS, loginFormElement);
                    }
                })
                .finally(() => {
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.unblockButton)(submitBtnElement);
                });
        }, 2000);
    });
};




/***/ }),

/***/ "./src/user/logout.js":
/*!****************************!*\
  !*** ./src/user/logout.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setLogoutBtnClick: () => (/* binding */ setLogoutBtnClick)
/* harmony export */ });
/* harmony import */ var _api_user_fetch_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/user/fetch-api.js */ "./src/api/user/fetch-api.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/user/util.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _filters_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filters.js */ "./src/filters.js");







const logoutBtnElement = document.getElementById('logout-btn');
const uploadBtnElement = document.querySelector('.img-upload__label');

const setLogoutBtnClick = (onSuccess) => {
    logoutBtnElement.addEventListener('click', () => {
        if (!localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN)){
            return;
        }

        const {token, id} = JSON.parse(localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_2__.AppStorage.ACCESS_TOKEN));

        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(logoutBtnElement, 'Logout');
        window.setTimeout(() => {
            (0,_api_user_fetch_api_js__WEBPACK_IMPORTED_MODULE_0__.deleteToken)(token, id)
                .then(() => {
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_3__.clearEntityList)('.picture');
                    (0,_filters_js__WEBPACK_IMPORTED_MODULE_4__.clouseFilterBtnClick)();
                    uploadBtnElement.style.opacity = '0';
                    onSuccess();
                })
                .finally(() => {
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(logoutBtnElement);
                });
        }, 2000);
    })
}




/***/ }),

/***/ "./src/user/main.js":
/*!**************************!*\
  !*** ./src/user/main.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.js */ "./src/user/validation.js");
/* harmony import */ var _signup_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signup-form.js */ "./src/user/signup-form.js");
/* harmony import */ var _login_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login-form.js */ "./src/user/login-form.js");
/* harmony import */ var _page_header_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-header.js */ "./src/user/page-header.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal */ "./src/user/modal.js");
/* harmony import */ var _logout_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logout.js */ "./src/user/logout.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _start_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../start.js */ "./src/start.js");









(0,_login_form_js__WEBPACK_IMPORTED_MODULE_2__.setLoginFormSubmit)(
    (token) => {
        (0,_modal__WEBPACK_IMPORTED_MODULE_4__.closeModal)();
        localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_6__.AppStorage.ACCESS_TOKEN, JSON.stringify(token));
        (0,_page_header_js__WEBPACK_IMPORTED_MODULE_3__.updatePageHeader)();
        (0,_start_js__WEBPACK_IMPORTED_MODULE_7__.start)();
    },
    _validation_js__WEBPACK_IMPORTED_MODULE_0__.renderValidationErrors
);
    
(0,_signup_form_js__WEBPACK_IMPORTED_MODULE_1__.setSignupFormSubmit)(
    () => {
        (0,_modal__WEBPACK_IMPORTED_MODULE_4__.closeModal)();
        (0,_start_js__WEBPACK_IMPORTED_MODULE_7__.start)();
    },
    _validation_js__WEBPACK_IMPORTED_MODULE_0__.renderValidationErrors
);

(0,_logout_js__WEBPACK_IMPORTED_MODULE_5__.setLogoutBtnClick)(() => {
    localStorage.removeItem(_const_js__WEBPACK_IMPORTED_MODULE_6__.AppStorage.ACCESS_TOKEN);
    (0,_page_header_js__WEBPACK_IMPORTED_MODULE_3__.updatePageHeader)();
});


/***/ }),

/***/ "./src/user/modal.js":
/*!***************************!*\
  !*** ./src/user/modal.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal)
/* harmony export */ });
/* harmony import */ var _modal_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal-util */ "./src/modal-util.js");


const nameElement = document.querySelector('title');
const loginModalElement = document.getElementById('login-modal');
const signupModalElement = document.getElementById('signup-modal');
const signupModalOpenElement = document.getElementById('signup-btn');
const loginModalOpenElement = document.getElementById('login-btn');
const modalBackdropTemplate = document.getElementById('modal-backdrop')
    .content
    .querySelector('.modal-backdrop');

const evtModal = [
    {
        btnElement: loginModalOpenElement,
        modalElement: loginModalElement
    },
    {
        btnElement: signupModalOpenElement,
        modalElement: signupModalElement
    }
];

let openModalElement;

const onModalEscKeydown = (0,_modal_util__WEBPACK_IMPORTED_MODULE_0__.getModalEscKeydownHandler)(() => {
    closeModal(openModalElement);
});
const onOverlayClick = (0,_modal_util__WEBPACK_IMPORTED_MODULE_0__.onModalOverlayClick)(() => {
    closeModal(openModalElement);
}, 'modal-dialog');

const openModal = (modalElement) => {
    const modalBackdropElement = modalBackdropTemplate.cloneNode(true);
    openModalElement = modalElement;
    openModalElement.insertAdjacentElement('afterend', modalBackdropElement);
    openModalElement.style.display = 'block';

    window.setTimeout(() => {
        openModalElement.classList.add('show');
        document.body.classList.add('modal-open');

        switch (openModalElement) {
            case loginModalElement:
                nameElement.textContent = 'WebdotApp-1 | Authorization';
                break;
            case signupModalElement:
                nameElement.textContent = 'WebdotApp-1 | Registration';
                break;
        }

        openModalElement.querySelector('.btn-close').addEventListener('click', closeModal);
        openModalElement.addEventListener('click', onOverlayClick);
        document.addEventListener('keydown', onModalEscKeydown);
    }, 0);
}

function closeModal() {
    openModalElement.classList.remove('show');
    window.setTimeout(() => {
        document.querySelectorAll('.modal-backdrop').forEach((bd) => bd.remove());
        openModalElement.style.display = 'none';
        document.body.classList.remove('modal-open');
        nameElement.textContent = 'WebdotApp-1';

        openModalElement.querySelector('.btn-close').removeEventListener('click', closeModal);
        openModalElement.removeEventListener('click', onOverlayClick);
        document.removeEventListener('keydown', onModalEscKeydown);
    }, 1000)
}

for (const {btnElement, modalElement} of evtModal) {
    btnElement.addEventListener('click', (evt) => {
        evt.preventDefault()
        openModal(modalElement);
    });
}



/***/ }),

/***/ "./src/user/page-header.js":
/*!*********************************!*\
  !*** ./src/user/page-header.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updatePageHeader: () => (/* binding */ updatePageHeader)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const userAvatarElement = document.querySelector('.wd-user-avatar');
const userNameElement = document.getElementById('username');

const updatePageHeader = () => {
    const accessToken = localStorage.getItem(_const_js__WEBPACK_IMPORTED_MODULE_0__.AppStorage.ACCESS_TOKEN);
    document.body.dataset.auth = Boolean(accessToken);

    if (accessToken) {
        const user = JSON.parse(accessToken).user;
        userAvatarElement.src = _const_js__WEBPACK_IMPORTED_MODULE_0__.Url.UPLOAD.AVATAR + user.avatar;
        userNameElement.textContent = user.name;
    }

    return Boolean(accessToken);
}




/***/ }),

/***/ "./src/user/signup-form.js":
/*!*********************************!*\
  !*** ./src/user/signup-form.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSignupFormSubmit: () => (/* binding */ setSignupFormSubmit)
/* harmony export */ });
/* harmony import */ var _api_user_fetch_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/user/fetch-api.js */ "./src/api/user/fetch-api.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/user/util.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");




const signupFormElement = document.querySelector('#signup-modal form');
const submitBtnElement = signupFormElement.querySelector('[type=submit]');

const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar'];

const setSignupFormSubmit = (onSuccess, onFail) => {
    signupFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(signupFormElement);

        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.blockButton)(submitBtnElement, 'Registration');
        window.setTimeout(() => {
            (0,_api_user_fetch_api_js__WEBPACK_IMPORTED_MODULE_0__.sendData)(_const__WEBPACK_IMPORTED_MODULE_2__.Url.USER.POST, formData)
                .then(({status, errors}) => {
                    if (status === 201) {
                        onSuccess();
                    } else {
                        onFail(errors, SIGNUP_FIELDS, signupFormElement);
                    }
                })
                .finally(() => {
                    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.unblockButton)(submitBtnElement);
                });
        }, 2000);
    });
}





/***/ }),

/***/ "./src/user/util.js":
/*!**************************!*\
  !*** ./src/user/util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockButton: () => (/* binding */ blockButton),
/* harmony export */   unblockButton: () => (/* binding */ unblockButton)
/* harmony export */ });
const spinnerTemplate = document.getElementById('spinner')
    .content
    .querySelector('.spinner-border');

const spinnerCommentsTemplate = document.getElementById('comments-loader')
    .content
    .querySelector('.comments-loader--active');

const blockButton = (buttonElement, text, typeSpinner = true, renderSpiner = true) => {
    buttonElement.setAttribute('disabled', '');
    buttonElement.style.cursor = 'not-allowed';

    if (text) {
        const spinnerElement = typeSpinner
            ? spinnerTemplate.cloneNode(true)
            : spinnerCommentsTemplate.cloneNode(true);
        blockButton.oldText = buttonElement.innerText;
        buttonElement.innerHTML = '';
        if (renderSpiner) {
            buttonElement.insertAdjacentElement('beforeend', spinnerElement);
        }
        buttonElement.insertAdjacentText('beforeend', `${text}...`);
    }
};

const unblockButton = (buttonElement) => {
    if (blockButton.oldText) {
        buttonElement.innerHTML = blockButton.oldText;
    }

    buttonElement.removeAttribute('disabled');
    buttonElement.style.cursor = 'pointer';
};




/***/ }),

/***/ "./src/user/validation.js":
/*!********************************!*\
  !*** ./src/user/validation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderValidationErrors: () => (/* binding */ renderValidationErrors)
/* harmony export */ });
const clearValidationErrors = (formElement) => {
    for (const inputElement of formElement.querySelectorAll('input')) {
        inputElement.classList.remove('is-invalid');
        inputElement.nextElementSibling.textContent = '';
    }
};

const convertErrorsToArray = (errors) => {
    const validationErrors = [];

    for (const key in errors) {
        validationErrors.push({
            field: key,
            message: errors[key][0]
        });
    }
    return validationErrors;
}

const renderValidationErrors = (errors, fields, formElement) => {
    clearValidationErrors(formElement);

    for (const error of convertErrorsToArray(errors)) {
        if (fields.includes(error.field)) {
            const inputElement = formElement.querySelector(`[name=${error.field}]`);
            inputElement.classList.add('is-invalid');
            inputElement.nextElementSibling.textContent = error.message;
        }
    }
};




/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkMobileVersion: () => (/* binding */ checkMobileVersion),
/* harmony export */   clearEntityList: () => (/* binding */ clearEntityList),
/* harmony export */   getRandomArrayElement: () => (/* binding */ getRandomArrayElement),
/* harmony export */   getRandomInt: () => (/* binding */ getRandomInt)
/* harmony export */ });
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (array) => {
    return array[getRandomInt(0, array.length - 1)];
}

const clearEntityList = (listElementSelector) => {
    const listElements = document.querySelectorAll(listElementSelector);
    listElements.forEach((element) => element.remove());
}

const checkMobileVersion = () => !window.matchMedia("(min-width: 599px)").matches;




/***/ }),

/***/ "./src/validation.js":
/*!***************************!*\
  !*** ./src/validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VALIDATION_ERROR_KEYS: () => (/* binding */ VALIDATION_ERROR_KEYS),
/* harmony export */   VALIDATORS: () => (/* binding */ VALIDATORS)
/* harmony export */ });
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const VALIDATION_ERROR_KEYS = [
    'Хэштег должен начинаться c символа "#".',
    'Строка после решётки, должна состоять только из букв и чисел.',
    'Хэштег не может состоять только из одной решётки.',
    `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов (включая решётку).`,
    'Один и тот же хэштег, не может быть использован дважды.',
    'Нельзя указать больше пяти хэштегов.'
];

const VALIDATORS = [
    {
        callback: (hashtag) => hashtag[0] !== '#',
        error: VALIDATION_ERROR_KEYS[0],
    },
    {
        callback: (hashtag) => hashtag.length > 1 && !/^#[A-Za-zА-Яа-я0-9]{1,19}$/.test(hashtag),
        error: VALIDATION_ERROR_KEYS[1],
    },
    {
        callback: (hashtag) => hashtag === '#',
        error: VALIDATION_ERROR_KEYS[2],
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            if (hashtag.length > MAX_HASHTAG_LENGTH) {
                const message = ` Удалите лишние ${hashtag.length - MAX_HASHTAG_LENGTH} симв.`;
                errorAddition[this.error] = message;
                return true;
            }
            return false;
        },
        error: VALIDATION_ERROR_KEYS[3], 
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            const isNotUnique = uniqueHashtags.has(hashtag.toLowerCase());
            uniqueHashtags.add(hashtag.toLowerCase());
            return isNotUnique;
        },
        error: VALIDATION_ERROR_KEYS[4],
    },
    {
        callback: function (hashtag, uniqueHashtags, errorAddition) {
            if (uniqueHashtags.size > MAX_HASHTAG_COUNT) {
                const message = ` Удалите лишние ${uniqueHashtags.size - MAX_HASHTAG_COUNT} хешт.`;
                errorAddition[this.error] = message;
                return true;
            }
            return false;
        },
        error: VALIDATION_ERROR_KEYS[5],
    },
]




/***/ }),

/***/ "./src/zoom.js":
/*!*********************!*\
  !*** ./src/zoom.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   zoomMinus: () => (/* binding */ zoomMinus),
/* harmony export */   zoomPlus: () => (/* binding */ zoomPlus)
/* harmony export */ });
const uploadModalElement = document.querySelector('.img-upload__overlay');
const scaleControlValueElement = uploadModalElement.querySelector('.scale__control--value');
const scaleControlBiggerElement = uploadModalElement.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = uploadModalElement.querySelector('.scale__control--smaller');
const previewImgElement = uploadModalElement.querySelector('.img-upload__preview img');

const SCALE_CONTROL_MAX_VALUE = 100;
const SCALE_CONTROL_MIN_VALUE = 25;
const SCALE_CONTROL_STEP = 25;

const isMaxValue = (value) => value === SCALE_CONTROL_MAX_VALUE;
const isMinValue = (value) => value === SCALE_CONTROL_MIN_VALUE;

const updateScaleControlElements = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));

    scaleControlBiggerElement.style.cursor = isMaxValue(value)
        ? 'not-allowed'
        : 'pointer';
    scaleControlSmallerElement.style.cursor = isMinValue(value)
        ? 'not-allowed'
        : 'pointer';
}

const zoomPlus = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    if (value < SCALE_CONTROL_MAX_VALUE) {
        const newValue = value + SCALE_CONTROL_STEP;
        scaleControlValueElement.value = newValue + '%';
        previewImgElement.style.transform = `scale(${newValue / 100})`;
        updateScaleControlElements();
    }
};

const zoomMinus = () => {
    const value = Number(scaleControlValueElement.value.replace('%', ''));
    if (value > SCALE_CONTROL_MIN_VALUE) {
        const newValue = value - SCALE_CONTROL_STEP;
        scaleControlValueElement.value = newValue + '%';
        previewImgElement.style.transform = `scale(${newValue / 100})`;
        updateScaleControlElements();
    }
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _comment_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment-form.js */ "./src/comment-form.js");
/* harmony import */ var _comment_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-list.js */ "./src/comment-list.js");
/* harmony import */ var _likes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./likes.js */ "./src/likes.js");
/* harmony import */ var _upload_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upload-modal.js */ "./src/upload-modal.js");
/* harmony import */ var _upload_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./upload-form.js */ "./src/upload-form.js");
/* harmony import */ var _picture_list_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./picture-list.js */ "./src/picture-list.js");
/* harmony import */ var _start_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./start.js */ "./src/start.js");
/* harmony import */ var _api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api/base/fetch-api.js */ "./src/api/base/fetch-api.js");
/* harmony import */ var _message_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./message.js */ "./src/message.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _enum_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./enum.js */ "./src/enum.js");
/* harmony import */ var _user_main_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./user/main.js */ "./src/user/main.js");















(0,_start_js__WEBPACK_IMPORTED_MODULE_6__.start)();

(0,_upload_form_js__WEBPACK_IMPORTED_MODULE_4__.setUploadFormSubmit)(() => {
    (0,_upload_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeUploadModal)();
    (0,_message_js__WEBPACK_IMPORTED_MODULE_8__.renderProgressBar)(_enum_js__WEBPACK_IMPORTED_MODULE_10__.MessageType.SUCCESS, () => {
        (0,_api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_7__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_9__.Url.PICTURE.GET)
            .then((picture) => {
                const data = picture.data;
                (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.renderPicturesList)(data, true);
            });
    });
});

(0,_comment_form_js__WEBPACK_IMPORTED_MODULE_0__.setCommentFormSabmit)((pictureId) => {
    (0,_api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_7__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_9__.Url.PICTURE.GET + `/${pictureId}`)
        .then((picture) => {
            const data = picture.data;
            localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_9__.AppStorage.PICTURE, JSON.stringify(data));
            const indexPicture = _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.indexOf(_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.find((picture) => picture.id === pictureId));
            _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.splice(indexPicture, 1, data);
            (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.updatePicture)(data);
            (0,_comment_list_js__WEBPACK_IMPORTED_MODULE_1__.renderCommentList)(data.comments);
        });
});

(0,_likes_js__WEBPACK_IMPORTED_MODULE_2__.setLikesCountClick)((pictureId) => {
    (0,_api_base_fetch_api_js__WEBPACK_IMPORTED_MODULE_7__.sendFetchRequest)(_const_js__WEBPACK_IMPORTED_MODULE_9__.Url.PICTURE.GET + `/${pictureId}`)
        .then((picture) => {
            const data = picture.data;
            localStorage.setItem(_const_js__WEBPACK_IMPORTED_MODULE_9__.AppStorage.PICTURE, JSON.stringify(data));
            const indexPicture = _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.indexOf(_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.find((picture) => picture.id === pictureId));
            _picture_list_js__WEBPACK_IMPORTED_MODULE_5__.pictures.splice(indexPicture, 1, data);
            (0,_picture_list_js__WEBPACK_IMPORTED_MODULE_5__.updatePicture)(data);
            (0,_likes_js__WEBPACK_IMPORTED_MODULE_2__.updateLikesCount)(data.likes);
        });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map