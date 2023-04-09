import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, selector) {
    super(selector)
    this._handleSubmitForm = handleSubmitForm
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll('.popup__item')
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  close() {
    super.close()
    this._selector.querySelector('.popup__form').reset()
  }

  setEventListeners() {
    super.setEventListeners()
    this._selector
      .querySelector('.popup__form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault()
        this._handleSubmitForm(this._getInputValues())
        this._selector.querySelector('.popup__form').reset()
        this.close()
      })
  }

  setInputValues({ nameSelector, professionSelector }, name, profession) {
    this._selector.querySelector(nameSelector).value = name
    this._selector.querySelector(professionSelector).value = profession
  }
}
