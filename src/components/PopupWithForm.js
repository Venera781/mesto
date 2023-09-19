import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(selector, validationConfig, submitFn) {
    super(selector);
    this._submitFn = submitFn;
    this._formEl = this._el.querySelector(validationConfig.formSelector);
    this._submitEl = this._formEl.querySelector(
      validationConfig.submitButtonSelector
    );
    this._inputs = Array.from(
      this._el.querySelectorAll(validationConfig.inputSelector)
    );
  }

  _getInputHelper(isValues) {
    const data = {};
    for (const input of this._inputs) {
      data[input.name] = isValues ? input.value : input;
    }
    return data;
  }

  _getInputValues() {
    return this._getInputHelper(true);
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    const prevText = this._submitEl.textContent;
    this._submitEl.textContent = "Сохранение...";
    this._submitEl.disabled = true;
    this._submitFn(values, () => {
      this._submitEl.textContent = prevText;
      this._submitEl.disabled = false;
    });
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

  setInputValues(inputsData) {
    this._inputs.forEach((input) => {
      input.value = inputsData[input.name] || "";
    });
  }
}

export default PopupWithForm;
