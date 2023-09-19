class UserInfo {
  constructor(selectName, selectProfession, selectAvatar) {
    this._nameEl = document.querySelector(selectName);
    this._professionEl = document.querySelector(selectProfession);
    this._avatarEl = document.querySelector(selectAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameEl.textContent,
      profession: this._professionEl.textContent,
      avatar: this._avatarEl.src,
    };
  }

  setUserInfo({ name, profession, avatar}) {
    if(name !== undefined) {
      this._nameEl.textContent = name;
    }
    if(profession !== undefined) {
      this._professionEl.textContent = profession;
    }
    if(avatar !== undefined) {
       this._avatarEl.src = avatar;
    }
  }
}
export default UserInfo;
