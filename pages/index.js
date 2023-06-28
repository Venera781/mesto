// Определение переменных для Формы Редактирования//
const buttonEdit = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup.popup_type_profile');
const headingProfile = popupProfile.querySelector('.popup__heading');
const nameInputProfile = popupProfile.querySelector('.popup__item[name="name"]');
const jobInputProfile = popupProfile.querySelector('.popup__item[name="profession"]');
const buttonCloseProfile = popupProfile.querySelector('.popup__close');
const btnSubmitProfile = popupProfile.querySelector('.popup__submit-button');
const formProfile = popupProfile.querySelector('.popup__content');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');


//Функция Открытие popup//
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Функция Закрытие popup//
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonCloseProfile.addEventListener('click', () => closePopup(popupProfile));


// Форма Редактирование Профиля =  Редактирование и cохранение новых данных Профиля//
function saveProfile() {
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
}

formProfile.addEventListener('submit', handleFormSubmitProfile);
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
  closePopup(popupProfile);
}
btnSubmitProfile.addEventListener('click', () => saveProfile(formProfile));


