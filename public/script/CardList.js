class CardList {
  constructor(container, card, api) {
    this.container = container;
    this.card = card;
    this.api = api;
  }

  render() {
    this.api.getInitialCards()
      .then((res) => {
        for (const elem of res) {
          this.container.insertAdjacentElement('beforeend', this.card.create(elem.link, elem.name, elem._id, elem.likes.length));
        }
      })
  }



 // addCard(link, name) {
   // this.api.postCard(link, name)
     // .then((data) => {
       // this.container.insertAdjacentElement('beforeend', this.card.create(data.link, data.name, data._id))
     // })
  //}
}