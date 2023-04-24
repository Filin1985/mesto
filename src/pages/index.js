import './index.css'
import { api } from '../components/Api'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import PopupConfirm from '../components/PopupConfirm'
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
  buttonSubmitCard,
  buttonDeleteCard,
} from '../utils/constants.js'

const imagePopupInstance = new PopupWithImage(imagePopupSelector)
imagePopupInstance.setEventListeners()
export let profileId
let cardsList

Promise.all([api.getUserProfile(), api.getAllCards()])
  .then(([userProfile, cards]) => {
    profileId = userProfile._id
    userInstance.renderUserInfo(
      userProfile.name,
      userProfile.about,
      userProfile.avatar
    )
    cardsList = new Section(
      {
        data: cards.reverse(),
        renderer: (cardItem) => {
          renderCard(cardItem, profileId)
        },
      },
      elementsListSelector
    )
    cardsList.renderItems()
  })
  .catch((error) => console.log(error.message))

const confirmForm = new PopupConfirm(
  {
    handleSubmitForm: (cardId) => {
      buttonDeleteCard.textContent = 'Удаление...'
      api
        .deleteCard(cardId)
        .then((res) => {
          console.log(res)
          document.getElementById(cardId).remove()
        })
        .catch((error) => console.log(error))
        .finally(() => {
          buttonDeleteCard.textContent = 'Да'
        })
    },
  },
  confirmPopupSelector
)
confirmForm.setEventListeners()

function renderCard(cardItem, profileId) {
  const newCard = new Card(
    {
      data: cardItem,
      handleCardClick: () => {
        imagePopupInstance.open({ data: cardItem })
      },
      handleCardDelete: () => {
        confirmForm.open(cardItem._id)
      },
      handleLike: () => {
        const likeElement = newCard.querySelector('.elements__like')
        const numberElement = newCard.querySelector('.elements__number')
        if (likeElement.classList.contains('elements__like_active')) {
          api
            .removeLikeFromCard(cardItem._id)
            .then((res) => {
              numberElement.textContent = res.likes.length
            })
            .catch((error) => {
              console.log(error.message)
            })
        } else {
          api
            .addLikeToCard(cardItem._id)
            .then((res) => {
              numberElement.textContent = res.likes.length
            })
            .catch((error) => {
              console.log(error.message)
            })
        }
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
      console.log(formData)
      buttonSubmitCard.textContent = 'Сохранение...'
      api
        .addNewCard(formData.name, formData.link)
        .then((res) => {
          console.log(res)
          renderCard(res, profileId)
        })
        .catch((error) => console.log(error))
        .finally(() => {
          buttonSubmitCard.textContent = 'Сохранить'
        })
    },
  },
  cardPopupSelector
)
cardForm.setEventListeners()

buttonAddCard.addEventListener('click', () => {
  newCardFormValidator.resetInputErrors()
  cardForm.open()
})
