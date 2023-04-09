import './index.css'
import { initialCards } from '../utils/data.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import UserInfo from '../components/UserInfo'
import {
  buttonOpenPopupProfile,
  buttonAddCard,
  cardsContainer,
  configValidation,
  cardTemplateSelector,
  elementsListSelector,
  userPopupSelector,
  cardPopupSelector,
  imagePopupSelector,
} from '../utils/constants.js'

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const newCard = new Card(
        {
          data: cardItem,
          handleCardClick: () => {
            const imagePopup = new PopupWithImage(
              { data: cardItem },
              imagePopupSelector
            )
            imagePopup.setEventListeners()
            imagePopup.open()
          },
        },
        cardTemplateSelector
      ).generateCard()
      cardsList.addItem(newCard)
    },
  },
  elementsListSelector
)

cardsList.renderItems()

const newCardFormValidator = new FormValidator(configValidation, 'card')
const profileFormValidator = new FormValidator(configValidation, 'profile')
newCardFormValidator.enableValidation()
profileFormValidator.enableValidation()

const userInstance = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__prof',
})

const popupProfileForm = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      userInstance.setUserInfo(formData['name'], formData['prof'])
    },
  },
  userPopupSelector
)
popupProfileForm.setEventListeners()

buttonOpenPopupProfile.addEventListener('click', () => {
  const { name, profession } = userInstance.getUserInfo()
  popupProfileForm.setInputValues(
    {
      nameSelector: '#name-input',
      professionSelector: '#prof-input',
    },
    name,
    profession
  )
  popupProfileForm.open()
})

const cardForm = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      const newCard = new Card(
        {
          data: formData,
          handleCardClick: () => {
            const imagePopup = new PopupWithImage(
              { data: formData },
              imagePopupSelector
            )
            imagePopup.setEventListeners()
            imagePopup.open()
          },
        },
        cardTemplateSelector
      ).generateCard()
      cardsContainer.insertAdjacentElement('afterbegin', newCard)
    },
  },
  cardPopupSelector
)
cardForm.setEventListeners()

buttonAddCard.addEventListener('click', () => {
  cardForm.open()
})
