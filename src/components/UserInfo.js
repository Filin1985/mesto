export default class UserInfo {
  constructor({ nameSelector, professionSelector }) {
    this._name = document.querySelector(nameSelector)
    this._profession = document.querySelector(professionSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent,
    }
  }

  setUserInfo(newName, newProfession) {
    this._name.textContent = newName
    this._profession.textContent = newProfession
  }
}
