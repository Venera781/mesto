class Card {
  static _templateElements = document.querySelector("#elements").content;

  constructor(data, templateSelector, handleCardClick) {
    this._newCard = null;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likeButton = null;
  }

  _getTemplate() {
    this._newCard = Card._templateElements
      .querySelector(this._templateSelector)
      .cloneNode(true);
    this._likeButton = this._newCard.querySelector(".element__icon-heart");
  }

  _setData() {
    const itemElementImage = this._newCard.querySelector(".element__image");
    itemElementImage.src = this._link;
    this._newCard.querySelector(".element__title").textContent = this._name;
    itemElementImage.setAttribute("alt", this._name);
  }

  _deleteCard = () => {
    this._newCard.remove();
    this._newCard = null;
    this._likeButton = null;
  };

  _handleLikeCard() {
    this._likeButton.classList.toggle("element__icon-heart_active");
  }

  _setListneres() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._newCard
      .querySelector(".element__icon-trash")
      .addEventListener("click", this._deleteCard);

    this._newCard
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  getCard() {
    this._getTemplate();
    this._setData();
    this._setListneres();

    return this._newCard;
  }
}

export default Card;
