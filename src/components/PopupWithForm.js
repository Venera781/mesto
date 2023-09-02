import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(selector, validationConfig, submitFn) {
    super(selector);
    this._submitFn = submitFn;
    this._formEl = this._el.querySelector(validationConfig.formSelector);
    this._inputs = Array.from(
      this._el.querySelectorAll(validationConfig.inputSelector)
    );
  }

  _getInputHelper(isValues) {
    const rv = {};
    for (const input of this._inputs) {
      rv[input.name] = isValues ? input.value : input;
    }
    return rv;
  }

  _getInputValues() {
    return this._getInputHelper(true);
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    this._submitFn(values);
  };

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._formEl.removeEventListener("submit", this._handleFormSubmit);
    this._formEl.reset();
  }

  open(initFormFn) {
    if (initFormFn) {
      const inputs = this._getInputHelper(false);
      initFormFn(inputs);
    }
    super.open();
  }
}

export default PopupWithForm;
