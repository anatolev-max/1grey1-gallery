import {debounce, getRandomArrayElement} from './util.js';
import {renderPicturesList, pictures} from './picture-list.js';
import {Filter} from './enum.js';

const filterList = document.querySelector('.img-filters--inactive');
const filtersFormElement = document.querySelector('.img-filters__form');
const RERENDER_DELAY = 200;

const ubdateBtnClassList = (evt) => {
    Object.values(Filter).forEach((idFilter) => {
        document
            .querySelector(`#filter-${idFilter}`)
            .className = 'img-filters__button';
    });

    document
        .querySelector(`#${evt.target.id}`)
        .classList.add('img-filters__button--active');
}

const randomPictureArray = (pictures) => {
    const uniqueObject = new Set();

    while (Array.from(uniqueObject).length !== pictures.length) {
        uniqueObject.add(getRandomArrayElement(pictures));
    }

    return Array.from(uniqueObject);
};

const filterBtnClick = (evt) => {
    const filterName = evt.target.id.split('-')[1];

    switch (filterName) {
        case Filter.DEFAULT:
            renderPicturesList(pictures.sort((a, b) => a.id - b.id), true);
            break;

        case Filter.RANDOM:
            renderPicturesList(randomPictureArray(pictures), true);
            break;

        case Filter.DISCUSSED:
            renderPicturesList(pictures.sort((a, b) => b.comments.length - a.comments.length), true);
            break;
    }
}

const debounced = debounce(filterBtnClick, RERENDER_DELAY);
const setFilterBtnClick = () => {
    filterList.style = 'opacity: 1';
    filtersFormElement.addEventListener('click', ubdateBtnClassList);
    filtersFormElement.addEventListener('click', debounced);
}

const removeFilterBtnClick = () => {
    filterList.style = 'opacity: 0';
    filtersFormElement.removeEventListener('click', ubdateBtnClassList);
    filtersFormElement.removeEventListener('click', debounced);
}

export {
    setFilterBtnClick,
    removeFilterBtnClick
};
