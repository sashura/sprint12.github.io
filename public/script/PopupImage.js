class PopupImage {
    constructor(element) {
        this.element = element;

    }
    popupBigImageOpen(sourseImage) {
        this.element.classList.add('popup_is-opened');
        const popupBigImage = this.element;
        const popupInnerImage = this.element.querySelector('.popup__innerimage');
        const popupImageCloseButton = this.element.querySelector('.popup__close_bigimage');
        popupInnerImage.src = sourseImage;
        popupImageCloseButton.addEventListener('click', function () {
        popupBigImage.classList.remove('popup_is-opened');
        popupInnerImage.src = '';
        })
    }
} 