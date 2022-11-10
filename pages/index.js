const buttonEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');
const buttonAdd = document.querySelector('.profile__add-button');

//Закрытие попапа//
buttonClose.addEventListener('click', closeBtn);
function closeBtn() {
  popup.classList.remove('popup_opened');
}

// Открытие=Функция редактирования/ Форма Редактирование Профиля//
buttonEdit.addEventListener('click', editBtn);
const heading = popup.querySelector('h3');
const nameInput = popup.querySelector('.popup__item[name="name"]');
const jobInput = popup.querySelector('.popup__item[name="profession"]');
function editBtn() {
  popup.classList.add('popup_opened');
  heading.textContent = 'Редактировать профиль';
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__profession').textContent;
  formElement.removeEventListener('submit', addImage);
  formElement.addEventListener('submit', handleFormSubmit);
}


//Функция сохранение новых данных в Форму Профиля и отображение новых данных в профиле//
// let btnSubmit = popup.querySelector('.popup__submit-button');
const formElement = popup.querySelector('.popup__content');
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  let finalName = document.querySelector('.profile__name');
  finalName.textContent = popup.querySelector('.popup__item[name="name"]').value;
  let finalProfession = document.querySelector('.profile__profession');
  finalProfession.textContent = popup.querySelector('.popup__item[name="profession"]').value;
  closeBtn();
}


//Открытие=Функция Внесение новых данных по карточке в Форму Добавления карточки//
const namePlace = popup.querySelector('.popup__item[name="name"]');
 linkPlace = popup.querySelector('.popup__item[name="profession"]');
buttonAdd.addEventListener('click', addBtn);
function addBtn() {
  popup.classList.add('popup_opened');
  let heading = popup.querySelector('h3');
  heading.textContent = 'Новое место';
  namePlace.setAttribute('placeholder', 'Название');
  namePlace.value = '';
  namePlace.name = 'placename';
  linkPlace.setAttribute('placeholder', 'Ссылка на картинку');
  linkPlace.value = '';
  linkPlace.name = 'link';
  formElement.removeEventListener('submit', handleFormSubmit);
  formElement.addEventListener('submit', addImage);
}


//Сохранение новой карточки и  отображение их на сайте в начале блока//
// btnSubmit.addEventListener('submit', addImage) 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function showImage(cards) {
  const templateElements = document.querySelector('#elements').content;
  //const itemElement =  templateElements.querySelector('.element').cloneNode(true);
  document.querySelector('.elements').innerHTML = '';

  for (let i = 0; i < cards.length; i++) {
    const itemElement = templateElements.querySelector('.element').cloneNode(true);
    itemElement.querySelector('.element__image').src = cards[i].link;
    itemElement.querySelector('.element__title').textContent = cards[i].name;
    namePlace.textContent = cards[i].name;
    linkPlace.textContent = cards[i].link;

    //Ставить лайк//
    itemElement.querySelector('.element__icon-heart').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__icon-heart_active');
    });
    //Удалить карточку//
    itemElement.querySelector('.element__icon-trash').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });
    itemElement.querySelector('.element__image').addEventListener('click', (evt) => {
      showPopupImage(evt.target.src, cards[i].name);
    });


    document.querySelector('.elements').append(itemElement);
  };
}
showImage(initialCards);




//Добавление новой карточки //
function addImage(evt) {
  evt.preventDefault();
  const templateElements = document.querySelector('#elements').content;
  const itemElement = templateElements.querySelector('.element').cloneNode(true);
  itemElement.querySelector('.element__image').src = popup.querySelector('.popup__item[name="link"]').value;
  itemElement.querySelector('.element__title').textContent = popup.querySelector('.popup__item[name="placename"]').value;

  //Ставить лайк//
  itemElement.querySelector('.element__icon-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon-heart_active');
  });

  //Удалить карточку//
  itemElement.querySelector('.element__icon-trash').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  itemElement.querySelector('.element__image').addEventListener('click', (evt) => {
    showPopupImage(evt.target.src, popup.querySelector('.popup__item[name="placename"]').value);
  });

  document.querySelector('.elements').prepend(itemElement);
  closeBtn();
}



//Открытие попап картинки/
let elementPopup = document.querySelector('.element__popup');
function showPopupImage(imageLink, name) {
  elementPopup.classList.add('element__popup_opened');
  elementPopup.querySelector('.element__popup-image').src = imageLink;
  elementPopup.querySelector('.element__popup-title').textContent = name;
  elementPopup.querySelector('.element__popup-close').addEventListener('click', imagePopupClose);
};

function imagePopupClose() {
  elementPopup.classList.remove('element__popup_opened');
}




