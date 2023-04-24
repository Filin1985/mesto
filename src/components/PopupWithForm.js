import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, selector) {
    super(selector)
    this._handleSubmitForm = handleSubmitForm
    this._inputList = this._popup.querySelectorAll('.popup__item')
    this._popupForm = this._popup.querySelector('.popup__form')
  }

  _getInputValues() {
    const formValues = {}
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value
    })
    return formValues
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitForm(this._getInputValues())
    })
  }

  setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name]
    })
  }
}
