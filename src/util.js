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

function debounce(func, ms) {
    let timeout;
    return (...rest) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, rest), ms);
    };
}

const checkMobileVersion = () => !window.matchMedia("(min-width: 599px)").matches;

export {
    getRandomInt,
    getRandomArrayElement,
    clearEntityList,
    checkMobileVersion,
    debounce
};
