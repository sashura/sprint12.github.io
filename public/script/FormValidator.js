class FormValidator {
    constructor(form) {
        this.form = form;
    }
    checkInputValidity(form) {
        this.form = form;
        let value = 0;
        const inputElement = Array.from(this.form.elements);
        inputElement.forEach((elem) => {
            const errorMessages = this.form.querySelector(`#error-${elem.id}`);  
            let validity = elem.validity;
            if (elem.id === 'submit') {
                return value = value + 1;
                }
            if (validity.typeMismatch) {
                errorMessages.textContent = 'Здесь должна быть ссылка';
                return;
                } 
            if (elem.value.length === 0) {
                errorMessages.textContent = 'Это обязательное поле';
                return;
                }
            if ((validity.tooShort) || (validity.tooLong )) {
                errorMessages.textContent = 'Должно быть от 2 до 30 символов';
            } else {
                errorMessages.textContent = '';
                return value = value + 1;
            };
        })
        return value;
    }

    setSubmitButtonState(form) {
        this.form = form;
        const popupButton = this.form.querySelector('.popup__button');
        if (formValidator.checkInputValidity(this.form) === Array.from(this.form.elements).length) {
            popupButton.classList.add('popup__button_active');
            popupButton.removeAttribute('disabled');
            return;
        } else if (formValidator.checkInputValidity(this.form) !== Array.from(this.form.elements).length){
            popupButton.classList.remove('popup__button_active');
            popupButton.setAttribute('disabled', '');
        }
    }
}