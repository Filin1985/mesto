export default class UserInfo {
  constructor({ nameSelector, professionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector)
    this._prof = document.querySelector(professionSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      prof: this._prof.textContent,
    }
  }

  renderUserInfo(name, profession, avatar) {
    this._name.textContent = name
    this._prof.textContent = profession
    this._avatar.src = avatar
  }

  setUserInfo(newName, newProfession) {
    this._name.textContent = newName
    this._prof.textContent = newProfession
  }
}
