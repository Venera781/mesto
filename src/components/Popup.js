class Popup {
  /**
   * Cоздание абстрактного класса Popup
   * @param selector - селектор дял получения попапа;
   */
  constructor(selector) {
    this._el = document.querySelector(selector);
    this._closeButtonEl = this._el.querySelector(".popup__close-btn");
  }

  open() {
    this._el.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._el.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
    this._el.removeEventListener("click", this._handleOverlayClose);
    this._closeButtonEl.removeEventListener("click", this._handleCloseButton);
  }

  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.close();
    }
  };
  // Проверяем, что элемент где пользователь кликнул мышкой находится за пределами содержимого попапа (т.е. был клик по оверлею)//
  _handleOverlayClose = (evt) => {
    const clickEl = evt.target;
    if (!clickEl.closest(".popup__container")) {
      this.close();
    }
  };

  _handleCloseButton = () => {
    this.close();
  };

  setEventListeners() {
    window.addEventListener("keydown", this._handleEscClose);
    this._el.addEventListener("mousedown", this._handleOverlayClose);
    this._closeButtonEl.addEventListener("click", this._handleCloseButton);
  }
}

export default Popup;
