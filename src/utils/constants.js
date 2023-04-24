export const buttonOpenPopupProfile =
  document.querySelector('.button_type_edit')
export const buttonAddCard = document.querySelector('.button_type_add')
export const popupProfileForm = document.querySelector('#popup-user')
export const buttonSubmitProfile = popupProfileForm.querySelector(
  '.button_type_submit'
)
export const cardTemplateSelector = '#card-template'
export const userPopupSelector = '#popup-user'
export const cardPopupSelector = '#popup-card'
export const avatarPopupSelector = '#popup-avatar'

export const imagePopupSelector = '#popup-image'
export const confirmPopupSelector = '#popup-confirm'

export const elementsListSelector = '.elements__list'

export const cardFormItem = document.forms['card']
export const confirmFormItem = document.forms['confirm']
export const buttonDeleteCard = confirmFormItem.querySelector(
  '.button_type_submit'
)
export const buttonSubmitCard = cardFormItem.querySelector(
  '.button_type_submit'
)
export const profileFormItem = document.forms['profile']
export const avatarFormItem = document.forms['avatar']
export const buttonSubmitAvatar = avatarFormItem.querySelector(
  '.button_type_submit'
)

export const buttonEditAvatar = document.querySelector('.profile__image')

export const configValidation = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_visible',
}
