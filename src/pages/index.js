import "./index.css";
import { validationConfig } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithSubmit from "../components/PopupWithSubmit";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Api from "../components/Api";

//Загрузка и редактирование данных с сервера

const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "bf52e809-820b-4544-9ff1-1e4a5136ff57",
    "Content-Type": "application/json",
  },
};

//1.Загрузка первоначальных карточек с сервера
const api = new Api(optionsApi);

//2.Загрузка информации о пользователи с сервера
const promiseInfoUser = api.getInfoUser();
promiseInfoUser.then((userData) => {
  const userId = userData.id;

  //3.Редактирование Профиля//
  const buttonEdit = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup.popup_type_profile");

  const profileInfo = new UserInfo(
    ".profile__name",
    ".profile__profession",
    ".profile__avatar"
  );

  profileInfo.setUserInfo(userData);

  const popupClassProfile = new PopupWithForm(
    ".popup.popup_type_profile",
    validationConfig,
    ({ name, profession }, onFinish) => {
      api
        .editProfile(name, profession)
        .then((data) => {
          profileInfo.setUserInfo({
            name: data.name,
            profession: data.about,
            avatar: data.avatar,
          });
          popupClassProfile.close();
        })
        .catch((err) => {
          console.log("Ошибка при отправки карточки", err);
        })
        .finally(onFinish);
    }
  );

  const formProfile = popupProfile.querySelector(".popup__form");
  const validatorProfile = new FormValidator(validationConfig, formProfile);

  // Редактирование Аватара//
  const popupAvatar = document.querySelector(".popup.popup_type_update");
  const buttonAvatarEdit = document.querySelector(".profile__avatar-wrapper");

  const popupClassAvatarEdit = new PopupWithForm(
    ".popup_type_update",
    validationConfig,
    ({ avatar }, onFinish) => {
      api
        .updateAvatar(avatar)
        .then((data) => {
          profileInfo.setUserInfo({
            avatar: data.avatar,
          });
          popupClassAvatarEdit.close();
        })
        .catch((err) => {
          console.log("Ошибка при отправки карточки", err);
        })
        .finally(onFinish);
    }
  );

  const formAvatar = popupAvatar.querySelector(".popup__form");
  const validatorAvatar = new FormValidator(validationConfig, formAvatar);

  //Экземпляр класса по создания разметки карточки//
  const sectionClass = new Section(renderCard, ".elements");

  //Определение переменных для Формы Добавления Картинки//
  const buttonAddImage = document.querySelector(".profile__add-button");
  const popupAddImage = document.querySelector(".popup.popup_type_addimage");
  const formAddImage = popupAddImage.querySelector(".popup__form");
  const validatorAddImage = new FormValidator(validationConfig, formAddImage);

  //Попап добавления картинки//
  const popupClassAddImage = new PopupWithForm(
    ".popup_type_addimage",
    validationConfig,
    ({ placename, link }, onFinish) => {
      api
        .addCard(placename, link)
        .then((data) => {
          renderCard(data);
          popupClassAddImage.close();
        })
        .catch((err) => {
          console.log("Ошибка при отправки карточки", err);
        })
        .finally(onFinish);
    }
  );

  //Определение переменных для Element=Image//
  const popupClassOpenImage = new PopupWithImage(".popup_type_element");

  //Форма удаления картинки с попапом подтверждения//
  const popupDeleteCard = new PopupWithSubmit(
    ".popup_type_confirm",
    validationConfig,
    (card) => {
      api
        .deleteCard(card.id)
        .then(() => {
          card.deleteCardEl();
          popupDeleteCard.close();
        })
        .catch((err) => console.log("Ошибка при удалении карточки", err));
    }
  );

  function handleCardDelete(card) {
    popupDeleteCard.open(card);
  }

  function handleCardClick(nameCard, linkCard) {
    popupClassOpenImage.open(nameCard, linkCard);
  }

  function handleLikeCard(card, alreadyLiked) {
    api
      .toggleLikes(card.id, alreadyLiked)
      .then((data) => {
        card.updateCardData(data);
      })
      .catch((err) => console.log("Ошибка при удалении карточки", err));
  }

  // Функция создания карточки//
  function renderCard({ name, link, _id, likes, owner }) {
    const card = new Card(
      {
        name,
        link,
        _id,
        likes,
        userId,
        ownerId: owner._id,
      },
      ".element",
      handleCardClick,
      handleLikeCard,
      handleCardDelete
      //handleLikeDelete,
    );
    sectionClass.addItem(card.getCard());
  }

  buttonEdit.addEventListener("click", () => {
    const info = profileInfo.getUserInfo();
    popupClassProfile.setInputValues(info);
    validatorProfile.resetFormState(false);
    popupClassProfile.open();
  });

  buttonAvatarEdit.addEventListener("click", () => {
    const info = profileInfo.getUserInfo();
    popupClassAvatarEdit.setInputValues(info);
    validatorAvatar.resetFormState(false);
    popupClassAvatarEdit.open();
  });

  buttonAddImage.addEventListener("click", () => {
    validatorAddImage.resetFormState(true);
    popupClassAddImage.open();
  });

  validatorProfile.enableValidation();
  validatorAddImage.enableValidation();
  validatorAvatar.enableValidation();

  const promiseCards = api.getInitialCards();
  promiseCards
    .then((cards) => {
      sectionClass.render(cards);
    })
    .catch((error) => {
      console.log(error);
    });
});
