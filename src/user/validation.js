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

export {renderValidationErrors};
