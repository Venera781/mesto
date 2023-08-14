import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Определение переменных для Формы Редактирования//
const buttonEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup.popup_type_profile");
const nameInputProfile = popupProfile.querySelector(
  '.popup__input[name="name"]'
);
const jobInputProfile = popupProfile.querySelector(
  '.popup__input[name="profession"]'
);
const buttonCloseProfile = popupProfile.querySelector(".popup__button");
const formProfile = popupProfile.querySelector(".popup__form");
const validatorProfile = new FormValidator (validationConfig, formProfile);
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

// Определение переменных для Element=Image//
const elementPopup = document.querySelector(".popup.popup_type_element");
const buttonCloseImage = elementPopup.querySelector(".popup__button");
const popupImage = elementPopup.querySelector(".popup__image");
const popupImageTitle = elementPopup.querySelector(".popup__title");

const elementsBlock = document.querySelector(".elements");

//Определение переменных для Формы Добавления Картинки//
const buttonAddImage = document.querySelector(".profile__add-button");
const popupAddImage = document.querySelector(".popup.popup_type_addimage");
const nameInputAddImage = popupAddImage.querySelector(
  '.popup__input[name="placename"]'
);
const linkInputAddImage = popupAddImage.querySelector(
  '.popup__input[name="link"]'
);
const buttonCloseAddImage = popupAddImage.querySelector(".popup__button");
const formAddImage = popupAddImage.querySelector(".popup__form");
const validatorAddImage = new FormValidator(validationConfig, formAddImage);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Функция Открытие popup//
function openPopup(popup) {
  popup.classList.add("popup_opened");

  //Закрытие окна попапа клавишей ESC
  window.addEventListener("keyup", function keyupListener(event) {
    if (event.code === "Escape" && popup.classList.contains("popup_opened")) {
      window.removeEventListener("keyup", keyupListener);
      closePopup(popup);
    }
  });

  //Закрытие попапа кликом на оверлей
  popup.addEventListener("click", function clickListener(event) {
    const target = event.target;
    if (!target.closest(".popup__container")) {
      popup.removeEventListener("click", clickListener);
      closePopup(popup);
    }
  });
}

//Функция Закрытие popup//
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Форма Редактирование Профиля =  Редактирование и cохранение новых данных Профиля//
function saveProfile() {
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
}

formProfile.addEventListener("submit", handleFormSubmitProfile);
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  saveProfile(formProfile);
  closePopup(popupProfile);
}

// Функция создания карточки//
function createCard(nameCard, linkCard) {
  const card = new Card(
    {
      name: nameCard,
      link: linkCard,
    },
    ".element",
    showPopupImage
  );
  return card.getCard();
}

//Отображение исходного массива карточек на сайте //
function showImageOnsite(cards) {
  for (let i = 0; i < cards.length; i++) {
    elementsBlock.append(createCard(cards[i].name, cards[i].link));
  }
}

//Открытие Popup картинки/
function showPopupImage(imageLink, name) {
  openPopup(elementPopup);
  popupImage.src = imageLink;
  popupImageTitle.textContent = name;
  popupImage.setAttribute("alt", name);
}

//Функция добавления созданной карточки в контейнер '.elements'//
function renderCard(cardEl) {
  elementsBlock.prepend(cardEl);
}

function handleFormSubmitAddImage(evt) {
  evt.preventDefault();
  renderCard(createCard(nameInputAddImage.value, linkInputAddImage.value));
  formAddImage.reset();
  closePopup(popupAddImage);
}

buttonEdit.addEventListener("click", () => {
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
  validatorProfile.resetFormState(false);
  openPopup(popupProfile);
});

buttonAddImage.addEventListener("click", () => {
  validatorAddImage.resetFormState(true);
  openPopup(popupAddImage);
});

buttonCloseAddImage.addEventListener("click", () => closePopup(popupAddImage));
buttonCloseImage.addEventListener("click", () => closePopup(elementPopup));
buttonCloseProfile.addEventListener("click", () => closePopup(popupProfile));

formAddImage.addEventListener("submit", handleFormSubmitAddImage);

showImageOnsite(initialCards);
validatorProfile.enableValidation();
validatorAddImage.enableValidation();
