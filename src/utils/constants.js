// Селекторы кнопок
export const buttonOpenPopupProfile =
  document.querySelector('.button_type_edit')
export const buttonAddCard = document.querySelector('.button_type_add')

// Селектор контейнар для карточек
export const cardsContainer = document.querySelector('.elements__list')

// Селекторы popup
export const popups = document.querySelectorAll('.popup')
export const popupProfileForm = document.querySelector('#popup-user')
export const popupCard = document.querySelector('#popup-card')

// Селектор формы новой карточки
export const popupCardForm = popupCard.querySelector('.popup__form')

// Селекторы полей poupCardForm
export const popupCardPlaceInput = popupCardForm.querySelector(
  '.popup__item_el_name'
)
export const popupCardImageInput = popupCardForm.querySelector(
  '.popup__item_el_prof'
)

// Селекторы полей профиля
export const nameProfile = document.querySelector('.profile__name')
export const profProfile = document.querySelector('.profile__prof')

// Селекторы полей popup профиля
export const popupProfileName = popupProfileForm.querySelector(
  '.popup__item_el_name'
)
export const popupProfileProf = popupProfileForm.querySelector(
  '.popup__item_el_prof'
)

export const configValidation = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_type_submit_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_visible',
}
