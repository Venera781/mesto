import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._elImage = this._el.querySelector(".popup__image");
    this._elImageTitle = this._el.querySelector(".popup__title");
  }

  open(link, name) {
    super.open();
    this._elImage.src = link;
    this._elImageTitle.textContent = name;
    this._elImage.setAttribute("alt", name);
  }
}
export default PopupWithImage;
