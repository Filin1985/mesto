import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._popupPhoto = this._popup.querySelector('.popup__photo')
    this._popupCaption = this._popup.querySelector('.popup__caption')
  }

  open({ data }) {
    this._popupPhoto.src = data.link
    this._popupPhoto.alt = data.name
    this._popupCaption.textContent = data.name
    super.open()
  }
}
