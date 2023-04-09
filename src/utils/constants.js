// Селекторы кнопок
export const buttonOpenPopupProfile =
  document.querySelector('.button_type_edit')
export const buttonAddCard = document.querySelector('.button_type_add')

// Селектор контейнар для карточек
export const cardsContainer = document.querySelector('.elements__list')

// Селекторы popup
export const popupProfileForm = document.querySelector('#popup-user')

export const configValidation = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_visible',
}
