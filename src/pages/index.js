import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";


const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Определение переменных для Формы Редактирования//
const buttonEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup.popup_type_profile");
const profileInfo = new UserInfo(".profile__name", ".profile__profession");
const popupClassProfile = new PopupWithForm(
  ".popup.popup_type_profile",
  validationConfig,
  (values) => {
    profileInfo.setUserInfo(values);
    popupClassProfile.close();
  }
);

const formProfile = popupProfile.querySelector(".popup__form");
const validatorProfile = new FormValidator(validationConfig, formProfile);

// Определение переменных для Element=Image//
const popupClassOpenImage = new PopupWithImage(".popup_type_element");

//Определение переменных для Формы Добавления Картинки//
const buttonAddImage = document.querySelector(".profile__add-button");
const popupAddImage = document.querySelector(".popup.popup_type_addimage");
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

const sectionClass = new Section({items: initialCards, renderer: createCard}, ".elements");

const popupClassAddImage = new PopupWithForm(
  ".popup_type_addimage",
  validationConfig,
  ({placename, link}) => {
    sectionClass.addItem(createCard({name: placename, link}));
    popupClassAddImage.close();
  }
);

function handleCardClick(nameCard, linkCard) {
  popupClassOpenImage.open(nameCard, linkCard);
}

// Функция создания карточки//
function createCard({name, link}) {
  const card = new Card(
    {
      name,
      link,
    },
    ".element",
    handleCardClick
  );
  return card.getCard();
}

buttonEdit.addEventListener("click", () => {
  validatorProfile.resetFormState(false);
  popupClassProfile.open((inputs) => {
    const info = profileInfo.getUserInfo();
    inputs.name.value = info.name;
    inputs.profession.value = info.profession;
  });
});

buttonAddImage.addEventListener("click", () => {
  validatorAddImage.resetFormState(true);
  popupClassAddImage.open();
});

sectionClass.render();
validatorProfile.enableValidation();
validatorAddImage.enableValidation();
