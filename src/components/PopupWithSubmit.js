import Popup from "./Popup";
class PopupWithSubmit extends Popup {
  constructor(selector, validationConfig, submitFn) {
    super(selector);
    this._submitFn = submitFn;
    this._formEl = this._el.querySelector(validationConfig.formSelector);
    this._btnSubmit = this._formEl.querySelector(
      validationConfig.submitButtonSelector
    );
    this._data = null;
  }

  open(data) {
    this._data = data;
    super.open();
  }

  close() {
    this._data = null;
    super.close();
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitFn(this._data);
    this._data = null;
  };

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", this._handleSubmit);
  }
}

export default PopupWithSubmit;
