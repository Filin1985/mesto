export default class UserInfo {
  constructor({ nameSelector, professionSelector }) {
    this._name = document.querySelector(nameSelector)
    this._prof = document.querySelector(professionSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      prof: this._prof.textContent,
    }
  }

  setUserInfo(newName, newProfession) {
    this._name.textContent = newName
    this._prof.textContent = newProfession
  }
}
