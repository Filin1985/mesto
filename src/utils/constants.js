// Селекторы кнопок
export const buttonOpenPopupProfile =
  document.querySelector('.button_type_edit')
export const buttonAddCard = document.querySelector('.button_type_add')

// Селекторы popup
export const popupProfileForm = document.querySelector('#popup-user')

export const cardTemplateSelector = '#card-template'
export const userPopupSelector = '#popup-user'
export const cardPopupSelector = '#popup-card'
export const imagePopupSelector = '#popup-image'
export const elementsListSelector = '.elements__list'

export const cardFormItem = document.forms['card']
export const profileFormItem = document.forms['profile']

export const configValidation = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_visible',
}
