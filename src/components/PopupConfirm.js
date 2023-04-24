import Popup from './Popup'

export default class PopupConfirm extends Popup {
  constructor({ handleSubmitForm }, selector) {
    super(selector)
    this._handleSubmitForm = handleSubmitForm
    this._popupForm = this._popup.querySelector('.popup__form')
    this._card
  }

  close() {
    super.close()
  }

  open(card) {
    this._card = card
    super.open()
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitForm(this._card)
    })
  }
}
