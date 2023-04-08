import './pages/index.css'

import { initialCards } from './scripts/data.js'
import { openPopup, closePopup } from './scripts/utils.js'
import FormValidator from './scripts/FormValidator.js'
import Card from './scripts/Card.js'
// Селекторы кнопок
const buttonOpenPopupProfile = document.querySelector('.button_type_edit')
const buttonAddCard = document.querySelector('.button_type_add')

// Селектор контейнар для карточек
const cardsContainer = document.querySelector('.elements__list')

// Селекторы popup
const popups = document.querySelectorAll('.popup')
const popupProfileForm = document.querySelector('#popup-user')
const popupCard = document.querySelector('#popup-card')

// Селектор формы новой карточки
const popupCardForm = popupCard.querySelector('.popup__form')

// Селекторы полей poupCardForm
const popupCardPlaceInput = popupCardForm.querySelector('.popup__item_el_name')
const popupCardImageInput = popupCardForm.querySelector('.popup__item_el_prof')

// Селекторы полей профиля
const nameProfile = document.querySelector('.profile__name')
const profProfile = document.querySelector('.profile__prof')

// Селекторы полей popup профиля
const popupProfileName = popupProfileForm.querySelector('.popup__item_el_name')
const popupProfileProf = popupProfileForm.querySelector('.popup__item_el_prof')

const configValidation = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_visible',
}

// Функция первоначальной загрузки данных
function renderCards(initialCards) {
  initialCards.map((card) => {
    appendCard(card)
  })
}

// Функция добавления карточки в DOM
function appendCard(card) {
  const newCard = new Card(card, '#card-template').generateCard()
  cardsContainer.insertAdjacentElement('afterbegin', newCard)
}

// Функция редактирования профиля
function setProfileValues(newName, newProf) {
  nameProfile.textContent = newName
  profProfile.textContent = newProf
}

const newCardFormValidator = new FormValidator(configValidation, 'card')
const profileFormValidator = new FormValidator(configValidation, 'profile')
newCardFormValidator.enableValidation()
profileFormValidator.enableValidation()

renderCards(initialCards)

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('button_type_close')) {
      closePopup(popup)
    }
  })
})

buttonOpenPopupProfile.addEventListener('click', () => {
  popupProfileName.value = nameProfile.textContent
  popupProfileProf.value = profProfile.textContent
  openPopup(popupProfileForm)
})

buttonAddCard.addEventListener('click', () => {
  popupCardForm.reset()
  openPopup(popupCard)
})

popupProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  setProfileValues(popupProfileName.value, popupProfileProf.value)
  closePopup(popupProfileForm)
})

popupCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  appendCard({
    name: popupCardPlaceInput.value,
    link: popupCardImageInput.value,
  })
  closePopup(popupCard)
  evt.target.reset()
})
