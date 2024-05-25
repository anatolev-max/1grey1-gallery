import {RenderPosition} from "../enum";

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
            buttonElement.insertAdjacentElement(RenderPosition.BEFOREEND, spinnerElement);
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

export {
    blockButton,
    unblockButton
};
