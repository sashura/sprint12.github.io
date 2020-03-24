class PopupUserData  {
    constructor(element, additionClass, formValidator) {
        this.element = element;
        this.additionClass = additionClass;
        this.formValidator = formValidator;
    }
    
    open() {
        this.element.classList.add('popup_is-opened');
        this.form = this.element.querySelector('.popup__form');
        this.additionClass.updateUserInfo(this.form);
        this.form.addEventListener('submit', () => {
            this.form.elements.button.textContent = "Загрузка";
            this.additionClass.setUserInfo()
              //  .then(() => )
            this.close()
        }, {once: true})
        this.element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
        this.element.addEventListener('input', () => this.formValidator.setSubmitButtonState(this.form));;
        //this.formValidator.setSubmitButtonState(this.form);

    }

    close() {
        this.element.classList.remove('popup_is-opened');
    }
}