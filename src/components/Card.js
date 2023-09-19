class Card {
  static _templateElements = document.querySelector("#elements").content;
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeCard,
    handleCardDelete
  ) {
    this._newCard = null;
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._likes = data.likes;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleCardDelete = handleCardDelete;
    this._likeButton = null;
    this._likeCount = null;
  }

  _getTemplate() {
    this._newCard = Card._templateElements
      .querySelector(this._templateSelector)
      .cloneNode(true);
    this._likeButton = this._newCard.querySelector(".element__icon-heart");
    this._likeCount = this._newCard.querySelector(".element__icon-like");
    this._deleteIcon = this._newCard.querySelector(".element__icon-trash");
  }

  _setData() {
    const itemElementImage = this._newCard.querySelector(".element__image");
    itemElementImage.src = this._link;
    this._newCard.querySelector(".element__title").textContent = this._name;
    itemElementImage.setAttribute("alt", this._name);

    if (this._checkLikedByMe()) {
      this._likeButton.classList.add("element__icon-heart_active");
    } else {
      this._likeButton.classList.remove("element__icon-heart_active");
    }
    this._likeCount.textContent = this._likes.length;

    if (this._userId === this._ownerId) {
      this._deleteIcon.classList.add("element__icon-trash_visible");
    } else {
      this._deleteIcon.classList.remove("element__icon-trash_visible");
    }
  }

  deleteCardEl() {
    this._newCard.remove();
    this._newCard = null;
    this._likeButton = null;
    this._deleteIcon = null;
  }

  _checkLikedByMe() {
    return this._likes.some((el) => el._id === this._userId);
  }

  updateCardData(newCardData) {
    this._name = newCardData.name;
    this._link = newCardData.link;
    this._id = newCardData._id;
    this._likes = newCardData.likes;
    this._setData();
  }

  _setListneres() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this, this._checkLikedByMe());
    });

    this._newCard
      .querySelector(".element__icon-trash")
      .addEventListener("click", () => {
        this._handleCardDelete(this);
      });

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
