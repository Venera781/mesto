class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getData(path) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // получить список всех карточек в виде массива
  getInitialCards() {
    return this._getData("cards").then((cards) => {
      cards.reverse();
      return cards;
    });
  }

  //получить данные пользователя
  getInfoUser() {
    return this._getData("users/me").then((data) => {
      return {
        name: data.name,
        profession: data.about,
        avatar: data.avatar,
        id: data._id,
      };
    });
  }

  _sendData(path, method, body) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //добавить карточку
  addCard(placename, link) {
    return this._sendData("cards", "POST", { name: placename, link: link });
  }

  //заменить данные пользователя
  editProfile(name, profession) {
    return this._sendData("users/me", "PATCH", { name, about: profession });
  }

  //удалить карточку (DELETE)
  deleteCard(id) {
    return this._sendData(`cards/${id}`, "DELETE");
  }

  //заменить аватар (PATCH)
  updateAvatar(avatar) {
    return this._sendData("users/me/avatar", "PATCH", { avatar: avatar });
  }

  //Ставить/удалить лайк карточки (DELETE)
  toggleLikes(id, alreadyLiked) {
    if (alreadyLiked) {
      return this._sendData(`cards/${id}/likes`, "DELETE");
    }
    return this._sendData(`cards/${id}/likes`, "PUT");
  }
}

export default Api;
