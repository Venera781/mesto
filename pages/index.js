// Определение переменных для Формы Редактирования//
const buttonEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup.popup_type_profile");
const headingProfile = popupProfile.querySelector(".popup__heading");
const nameInputProfile = popupProfile.querySelector(
  '.popup__input[name="name"]'
);
const jobInputProfile = popupProfile.querySelector(
  '.popup__input[name="profession"]'
);
const buttonCloseProfile = popupProfile.querySelector(".popup__button");
const btnSubmitProfile = popupProfile.querySelector(".popup__submit-button");
const formProfile = popupProfile.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

// Определение переменных для Element=Image//
const elementPopup = document.querySelector(".popup.popup_type_element");
const buttonCloseImage = elementPopup.querySelector(".popup__button");
const popupImage = elementPopup.querySelector(".popup__image");
const popupImageTitle = elementPopup.querySelector(".popup__title");

const elementsBlock = document.querySelector(".elements");
const templateElements = document.querySelector("#elements").content;
const elementImage = document.querySelectorAll(".element__image");

//Определение переменных для Формы Добавления Картинки//
const buttonAddImage = document.querySelector(".profile__add-button");
const popupAddImage = document.querySelector(".popup.popup_type_addimage");
const headingAddImage = popupAddImage.querySelector(".popup__heading");
const nameInputAddImage = popupAddImage.querySelector(
  '.popup__input[name="placename"]'
);
const linkInputAddImage = popupAddImage.querySelector(
  '.popup__input[name="link"]'
);
const buttonCloseAddImage = popupAddImage.querySelector(".popup__button");
const btnSubmitAddImage = popupAddImage.querySelector(".popup__submit-button");
const formAddImage = popupAddImage.querySelector(".popup__form");
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
  window.addEventListener("keyup", function KeyUpListener(event) {
    if (event.code === "Escape" && popup.classList.contains("popup_opened")) {
      window.removeEventListener("keyup", KeyUpListener);
      closePopup(popup);
    }
  });

  //Закрытие попапа кликом на оверлей
  popup.addEventListener("click", function ClickListener(event) {
    const target = event.target;
    if (!target.closest(".popup__container")) {
      popup.removeEventListener("click", ClickListener);
      closePopup(popup);
    }
  });
}

//Функция Закрытие popup//
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

buttonEdit.addEventListener("click", () => {
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
  openPopup(popupProfile);
});

buttonCloseProfile.addEventListener("click", () => closePopup(popupProfile));
buttonAddImage.addEventListener("click", () => openPopup(popupAddImage));
buttonCloseAddImage.addEventListener("click", () => closePopup(popupAddImage));
buttonCloseImage.addEventListener("click", () => closePopup(elementPopup));

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

//Функция создания карточки//
function createCard(namecard, linkcard) {
  const itemElement = templateElements
    .querySelector(".element")
    .cloneNode(true);
  const itemElementImage = itemElement.querySelector(".element__image");
  itemElementImage.src = linkcard;
  itemElement.querySelector(".element__title").textContent = namecard;
  itemElementImage.setAttribute("alt", namecard);

  //Ставить лайк//
  itemElement
    .querySelector(".element__icon-heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__icon-heart_active");
    });

  //Удалить карточку//
  itemElement
    .querySelector(".element__icon-trash")
    .addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
    });

  //Открытие Popup Картинки//
  itemElementImage.addEventListener("click", (evt) => {
    showPopupImage(evt.target.src, namecard);
  });

  return itemElement;
}

//Отображение исходного массива карточек на сайте //
function showImageOnsite(cards) {
  elementsBlock.innerHTML = "";

  for (let i = 0; i < cards.length; i++) {
    elementsBlock.append(createCard(cards[i].name, cards[i].link));
  }
}
showImageOnsite(initialCards);

//Открытие Popup картинки/
function showPopupImage(imageLink, name) {
  openPopup(elementPopup);
  popupImage.src = imageLink;
  popupImageTitle.textContent = name;
  popupImage.setAttribute("alt", name);
}

//Функция добавления созданной карточки в контейнер '.elements'//
function renderCard(card) {
  elementsBlock.prepend(card);
}

formAddImage.addEventListener("submit", handleFormSubmitAddImage);

function handleFormSubmitAddImage(evt) {
  evt.preventDefault();
  renderCard(createCard(nameInputAddImage.value, linkInputAddImage.value));
  formAddImage.reset();
  closePopup(popupAddImage);
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
