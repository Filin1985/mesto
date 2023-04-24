import { profileId } from '../pages/index.js'

export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, handleLike },
    templateSelector
  ) {
    this._name = data.name
    this._link = data.link
    this._owner = data.owner
    this._likes = data.likes
    this._cardId = data._id
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._handleLike = handleLike
    this._cardImage
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true)
    this._cardImage = cardElement.querySelector('.elements__image')
    return cardElement
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick()
    })
    this._element
      .querySelector('.elements__like')
      .addEventListener('click', (evt) => {
        this._handleLike()
        evt.target.classList.toggle('elements__like_active')
      })
    this._element
      .querySelector('.elements__delete')
      .addEventListener('click', () => {
        this._handleCardDelete()
      })
  }

  generateCard(profileId) {
    this._element = this._getTemplate()
    if (this._owner._id !== profileId) {
      this._element
        .querySelector('.elements__delete')
        .classList.add('elements__delete_hide')
    }
    const likeElement = this._element.querySelector('.elements__like')
    this._likes.forEach((like) => {
      if (like._id === profileId) {
        likeElement.classList.add('elements__like_active')
      }
    })
    const numberElement = this._element.querySelector('.elements__number')
    numberElement.textContent = this._likes.length
    this._element.querySelector('.elements__title').textContent = this._name
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._element.id = this._cardId
    this._setEventListeners()
    return this._element
  }
}
