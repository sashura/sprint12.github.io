class UserInfo {
  constructor(api, formValidator) {
    this.api = api;
    this.formValidator = formValidator;
  }

  loadUpdateInfo() {
    this.api.getUserInfoApi()
      .then((data) => {
        document.querySelector('.user-info__name').textContent = data.name;
        document.querySelector('.user-info__job').textContent = data.about;
        document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.avatar})`
      });
  }

  updateUserInfo(form) {
    // event.preventDefault();
    this.form = form;
    const userNameElement = this.form.elements.username;
    const jobNameElement = this.form.elements.job;
    this.api.getUserInfoApi()
      .then((data) => {
        // document.querySelector('.user-info__name').textContent = data.name;
        // document.querySelector('.user-info__job').textContent = data.about;
        // document.querySelector('.user-info__photo').style.backgroundImage=`url(${data.avatar})`;
        userNameElement.value = data.name;
        jobNameElement.value = data.about;
        this.formValidator.setSubmitButtonState(this.form);
      })
      .finally(() => this.form.elements.button.textContent = "Сохранить");
  }

  setUserInfo() {
    event.preventDefault();
    const userNameElement = this.form.elements.username;
    const jobNameElement = this.form.elements.job;
    this.api.updateUserInfoApi(userNameElement.value, jobNameElement.value)
      .then(this.loadUpdateInfo())
    // .finally(() => this.form.parentNode.parentNode.classList.remove('popup_is-opened'))
      .then(() => this.form.elements.button.textContent = "Сохранить");
  }
}
