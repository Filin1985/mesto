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

  renderUserInfo(name, profession) {
    this._name.textContent = name
    this._prof.textContent = profession
  }

  setUserInfo(newName, newProfession) {
    this._name.textContent = newName
    this._prof.textContent = newProfession
  }
}
