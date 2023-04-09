export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector)
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose)
    const errorElement = this._selector.querySelectorAll('.popup__item-error')
    errorElement.forEach((element) => {
      element.textContent = ''
    })
    this._selector.classList.add('popup_opened')
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._selector.classList.remove('popup_opened')
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened')
      close(popup)
    }
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this._handleEscClose(this._selector)
      }
      if (evt.target.classList.contains('button_type_close')) {
        this._handleEscClose(this._selector)
      }
    })
  }
}
