class UserInfo {
  constructor(selectName, selectProfession) {
    this._nameEl = document.querySelector(selectName);
    this._professionEl = document.querySelector(selectProfession);
  }

  getUserInfo() {
    return {
      name: this._nameEl.textContent,
      profession: this._professionEl.textContent,
    };
  }

  setUserInfo({ name, profession }) {
    this._nameEl.textContent = name;
    this._professionEl.textContent = profession;
  }
}
export default UserInfo;
