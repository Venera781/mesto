const showInputError = (form, input, validationConfig) => {
  const span = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  span.textContent = input.validationMessage;
  span.classList.add(validationConfig.errorClass);
};

const hideInputError = (form, input, validationConfig) => {
  const span = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  span.classList.remove(validationConfig.errorClass);
  span.textContent = " ";
};

const checkInputValidity = (form, input, validationConfig) => {
  if (!input.validity.valid) {
    showInputError(form, input, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
};

const hasInvalidValue = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputs, button, validationConfig) => {
  if (hasInvalidValue(inputs)) {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.disabled = false;
  }
};

const setEventListeners = (form, validationConfig) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const button = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputs, button, validationConfig);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, validationConfig);
      toggleButtonState(inputs, button, validationConfig);
    });
  });
};

function enableValidation(validationConfig) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  forms.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(form, validationConfig);
  });
}
