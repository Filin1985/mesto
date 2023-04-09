import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor({ data }, selector) {
    super(selector)
    this._cardTitle = data.name
    this._cardImage = data.link
  }

  open() {
    this._selector.querySelector('.popup__photo').src = this._cardImage
    this._selector.querySelector('.popup__photo').alt = this._cardTitle
    this._selector.querySelector('.popup__caption').textContent =
      this._cardTitle
    super.open()
  }
}
