
const authorization = {
    url: 'http://95.216.175.5/cohort7',
    token: '3c086750-43bf-4c7c-845d-6a8a6edc4f3f'
}
const userButtonAddCard = document.querySelector('.user-info__button');
const userInfoButton = document.querySelector('.user-info__edit');
const container = document.querySelector('.places-list');
const getPlaceCardImages = () => document.querySelectorAll('.place-card__image');
const userAvatar = document.querySelector('.user-info__photo');
const api = new API(authorization);
const card = new Card(api);
const popupImage = new PopupImage(document.querySelector('.popup__bigimage'));
const cardList = new CardList(container, card, api);
const formValidator = new FormValidator();
const userInfo = new UserInfo(api, formValidator);
const userDataForm = document.forms.userdata;
userInfo.loadUpdateInfo();
cardList.render();

userButtonAddCard.addEventListener('click', function () {
    new PopupNewCard(document.querySelector('.popup__newcard'), card, formValidator, container, api, {once: true}).open();
});

userInfoButton.addEventListener('click', function () {
    new PopupUserData(document.querySelector('.popup__userdata'), userInfo, formValidator).open();
});

userAvatar.addEventListener('click', function () {
    new PopupAvatar(document.querySelector('.popup__avatar'), api, formValidator, userInfo).open()
});

getPlaceCardImages().forEach(function (image) {
    const linkImage = String(image.style.backgroundImage);
    const sourseImage = linkImage.slice(5, -2);
    image.addEventListener('click', function () {
        if (event.target.classList.contains('place-card__delete-icon')) {
            return;
        }
        popupImage.popupBigImageOpen(sourseImage);
    })
});


