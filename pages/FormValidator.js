class FormValidator {
  constructor(validationConfig, formEl) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formEl = formEl;
    this._inputs = null;
    this._button = null;
  }

  _showInputError(input) {
    const span = this._formEl.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    span.textContent = input.validationMessage;
    span.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const span = this._formEl.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    span.classList.remove(this._errorClass);
    span.textContent = " ";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidValue() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidValue()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputs = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._button = this._formEl.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetFormState(resetInputs) {
    if (resetInputs) {
      this._formEl.reset();
    }
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      if (resetInputs) {
        this._hideInputError(input);
      } else {
        this._checkInputValidity(input);
      }
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
