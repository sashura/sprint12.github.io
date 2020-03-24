class Card {
    constructor(api) {
        this.api = api;
    }
    create(linkValue, nameValue, idValue, likesValue) {
          
        const card = document.createElement('div');
        card.classList.add('place-card');
        card.id = idValue;

        const image = document.createElement('div');
        image.classList.add('place-card__image');
        image.setAttribute('style', 'background-image: url(' + linkValue + ')');

        const deleteIcon = document.createElement('button');
        deleteIcon.classList.add('place-card__delete-icon');

        const description = document.createElement('div');
        description.classList.add('place-card__description');

        const name = document.createElement('h3');
        name.classList.add('place-card__name');
        name.textContent = nameValue;

        const like = document.createElement('div');
        like.classList.add('place-card__like');

        const likeIcon = document.createElement('button');
        likeIcon.classList.add('place-card__like-icon');

        const likeCounter = document.createElement('h4');
        likeCounter.classList.add('place-card__like-counter');
        likeCounter.textContent = likesValue;

        image.appendChild(deleteIcon);
        description.appendChild(name);
        description.appendChild(like);
        like.appendChild(likeIcon);
        like.appendChild(likeCounter);
        card.appendChild(image);
        card.appendChild(description);

        likeIcon.addEventListener('click', this.like.bind(this));
        deleteIcon.addEventListener('click', this.remove.bind(this));
        return card;
    }
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        //fetch()
       // if (event.target.classList.contains('place-card__delete-icon')) {
         //   this.updateData.removeCard(this.id);
        //};
        this.api.delete(event.target.closest('.place-card').id);
        event.target.closest('.place-card').remove();
    }
}