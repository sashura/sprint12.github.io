class PopupNewCard {
  constructor(element, additionClass, formValidator, container, api) {
    this.element = element;
    this.additionClass = additionClass;
    this.formValidator = formValidator;
    this.container = container;
    this.api = api;
  }

  open() {
    this.element.classList.add('popup_is-opened');
    this.form = this.element.querySelector('.popup__form');
    this.element.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this.formValidator.setSubmitButtonState(this.form);
    this.element.addEventListener('input', () => this.formValidator.setSubmitButtonState(this.form));
    this.form.addEventListener('submit', () => this.addNewCard(this.form));
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }

  addNewCard(form) {
    this.form = form;
    event.preventDefault();
    this.api.postCard(this.form.elements[1].value, this.form.elements[0].value)
      .then((data) => {
        this.container.insertAdjacentElement('beforeend', this.additionClass.create(this.form.elements[1].value, this.form.elements[0].value)),
        // this.container.insertAdjacentElement('beforeend', this.additionClass.create(this.form.elements[1].value, this.form.elements[0].value));
        this.close(),
        this.form.reset();
      });
  }
}
