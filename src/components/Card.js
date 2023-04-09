// Селекторы полей popupCardImage
const popupCardImage = document.querySelector('#popup-image')
const caption = popupCardImage.querySelector('.popup__caption')
const popupImage = popupCardImage.querySelector('.popup__photo')

class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true)
    return cardElement
  }

  _setEventListeners() {
    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => {
        this._handleCardClick()
      })
    this._element
      .querySelector('.elements__like')
      .addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__like_active')
      })
    this._element
      .querySelector('.elements__delete')
      .addEventListener('click', () => {
        this._element.remove()
      })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.elements__title').textContent = this._name
    const newCardImage = this._element.querySelector('.elements__image')
    newCardImage.src = this._link
    newCardImage.alt = this._name
    this._setEventListeners()
    return this._element
  }
}

export default Card
