import './index.css'
import { initialCards } from '../utils/data.js'
import { api } from '../components/Api'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import UserInfo from '../components/UserInfo'
import {
  buttonOpenPopupProfile,
  buttonAddCard,
  configValidation,
  cardTemplateSelector,
  elementsListSelector,
  userPopupSelector,
  cardPopupSelector,
  imagePopupSelector,
  cardFormItem,
  profileFormItem,
} from '../utils/constants.js'

const imagePopupInstance = new PopupWithImage(imagePopupSelector)
imagePopupInstance.setEventListeners()

Promise.all([api.getUserProfile(), api.getAllCards()])
  .then(([userProfile, cards]) => {
    userInstance.renderUserInfo(userProfile.name, userProfile.about)
    const cardsList = new Section(
      {
        data: cards,
        renderer: (cardItem) => {
          renderCard(cardItem, cardsList)
        },
      },
      elementsListSelector
    )
    cardsList.renderItems()
  })
  .catch((error) => console.log(error.message))

function renderCard(cardItem, cardsList) {
  const newCard = new Card(
    {
      data: cardItem,
      handleCardClick: () => {
        imagePopupInstance.open({ data: cardItem })
      },
    },
    cardTemplateSelector
  ).generateCard()
  cardsList.addItem(newCard)
}

const newCardFormValidator = new FormValidator(configValidation, cardFormItem)
const profileFormValidator = new FormValidator(
  configValidation,
  profileFormItem
)
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
  const { name, prof } = userInstance.getUserInfo()
  popupProfileForm.setInputValues({ name, prof })
  profileFormValidator.resetInputErrors()
  popupProfileForm.open()
})

const cardForm = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      renderCard(formData)
    },
  },
  cardPopupSelector
)
cardForm.setEventListeners()

buttonAddCard.addEventListener('click', () => {
  newCardFormValidator.resetInputErrors()
  cardForm.open()
})
