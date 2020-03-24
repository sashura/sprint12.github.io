class PopupAvatar {
    constructor (element, api, formValidator, userInfo) {
        this.element = element;
        this.api = api;
        this.formValidator = formValidator;
        this.userInfo = userInfo;

    }
    open () {
        this.element.classList.add('popup_is-opened');
        this.form = this.element.querySelector('.popup__form');
        this.element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
        this.formValidator.setSubmitButtonState(this.form);
        this.element.addEventListener('input', () => this.formValidator.setSubmitButtonState(this.form));
        this.form.addEventListener('submit', () => {
            this.newAvatar();
            }, {once: true})
    }

    newAvatar () {
        event.preventDefault();
        this.api.newAvatar(this.form.elements[0].value);
        document.querySelector('.user-info__photo').style.backgroundImage = `url(${this.form.elements[0].value})`;
        this.close();
        this.form.reset();
    }

    close () {
        this.element.classList.remove('popup_is-opened');
        
    }
}