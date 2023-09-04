import "./index.css";
import { validationConfig, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";

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

const sectionClass = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements"
);

const popupClassAddImage = new PopupWithForm(
  ".popup_type_addimage",
  validationConfig,
  ({ placename, link }) => {
    sectionClass.addItem({ name: placename, link });
    popupClassAddImage.close();
  }
);

function handleCardClick(nameCard, linkCard) {
  popupClassOpenImage.open(nameCard, linkCard);
}

// Функция создания карточки//
function renderCard({ name, link }) {
  const card = new Card(
    {
      name,
      link,
    },
    ".element",
    handleCardClick
  );
  sectionClass.addItem(card.getCard()) ;
}

buttonEdit.addEventListener("click", () => {
  validatorProfile.resetFormState(false);
  const info = profileInfo.getUserInfo();
  popupClassProfile.setInputValues(info);
  popupClassProfile.open();
});

buttonAddImage.addEventListener("click", () => {
  validatorAddImage.resetFormState(true);
  popupClassAddImage.open();
});

sectionClass.render(initialCards);
validatorProfile.enableValidation();
validatorAddImage.enableValidation();
