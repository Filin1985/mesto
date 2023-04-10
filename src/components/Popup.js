export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose)
    const errorElement = this._popup.querySelectorAll('.popup__item-error')
    errorElement.forEach((element) => {
      element.textContent = ''
    })
    this._popup.classList.add('popup_opened')
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.classList.remove('popup_opened')
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      } else if (evt.target.classList.contains('button_type_close')) {
        this.close()
      }
    })
  }
}
