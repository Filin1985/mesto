import './index.css'

import { initialCards } from '../utils/data.js'
import { openPopup, closePopup } from '../utils/utils.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section'
import {
  buttonOpenPopupProfile,
  buttonAddCard,
  cardsContainer,
  popups,
  popupProfileForm,
  popupCard,
  popupCardForm,
  popupCardPlaceInput,
  popupCardImageInput,
  nameProfile,
  profProfile,
  popupProfileName,
  popupProfileProf,
  configValidation,
} from '../utils/constants.js'

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const newCard = new Card(cardItem, '#card-template').generateCard()
      cardsList.addItem(newCard)
    },
  },
  '.elements__list'
)

cardsList.renderItems()

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

// renderCards(initialCards)

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
