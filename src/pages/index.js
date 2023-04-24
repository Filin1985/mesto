import './index.css'
import { api } from '../components/Api'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import Popup from '../components/Popup'
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
  confirmPopupSelector,
  cardFormItem,
  profileFormItem,
  buttonSubmitProfile,
} from '../utils/constants.js'

const imagePopupInstance = new PopupWithImage(imagePopupSelector)
imagePopupInstance.setEventListeners()
const confirmPopupInstance = new Popup(confirmPopupSelector)
confirmPopupInstance.setEventListeners()

Promise.all([api.getUserProfile(), api.getAllCards()])
  .then(([userProfile, cards]) => {
    const profileId = userProfile._id
    userInstance.renderUserInfo(
      userProfile.name,
      userProfile.about,
      userProfile.avatar
    )
    const cardsList = new Section(
      {
        data: cards,
        renderer: (cardItem) => {
          renderCard(cardItem, cardsList, profileId)
        },
      },
      elementsListSelector
    )
    cardsList.renderItems()
  })
  .catch((error) => console.log(error.message))

function renderCard(cardItem, cardsList, profileId) {
  const newCard = new Card(
    {
      data: cardItem,
      handleCardClick: () => {
        imagePopupInstance.open({ data: cardItem })
      },
      handleCardDelete: () => {
        confirmPopupInstance.open()
      },
    },
    cardTemplateSelector
  ).generateCard(profileId)
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
  avatar: '.profile__avatar',
})

const popupProfileForm = new PopupWithForm(
  {
    handleSubmitForm: (formData) => {
      buttonSubmitProfile.textContent = 'Сохранение...'
      api
        .saveProfileData(formData['name'], formData['prof'])
        .then((res) => {
          userInstance.setUserInfo(res.name, res.about)
        })
        .catch((error) => {
          console.log(error.message)
        })
        .finally(() => {
          popupProfileForm.close()
          buttonSubmitProfile.textContent = 'Сохранить'
        })
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
