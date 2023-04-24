import Popup from './Popup'

export default class PopupConfirm extends Popup {
  constructor({ handleSubmitForm }, selector) {
    super(selector)
    this._handleSubmitForm = handleSubmitForm
    this._popupForm = this._popup.querySelector('.popup__form')
    this._cardId
  }

  close() {
    super.close()
  }

  open(cardId) {
    this._cardId = cardId
    super.open()
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitForm(this._cardId)
      this.close()
    })
  }
}
