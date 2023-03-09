import { enableValidation } from "./validate.js"
// Селекторы кнопок
const buttonOpenPopupProfile = document.querySelector(".button_type_edit")
const buttonAddCard = document.querySelector(".button_type_add")

// Селектор контейнар для карточек
const cardsContainer = document.querySelector(".elements__list")

// Селекторы popup
const popups = document.querySelectorAll(".popup")
const popupProfileForm = document.querySelector("#popup-user")
const popopCard = document.querySelector("#popup-card")
const popupCardImage = document.querySelector("#popup-image")

// Селектор формы новой карточки
const poupCardForm = popopCard.querySelector(".popup__form")

// Селекторы полей popupCardImage
const caption = popupCardImage.querySelector(".popup__caption")
const popupImage = popupCardImage.querySelector(".popup__photo")

// Селекторы полей poupCardForm
const popupCardPlaceInput = poupCardForm.querySelector(".popup__item_el_name")
const popupCardImageInput = poupCardForm.querySelector(".popup__item_el_prof")

// Селекторы полей профиля
const nameProfile = document.querySelector(".profile__name")
const profProfile = document.querySelector(".profile__prof")

// Селекторы полей popup профиля
const popupProfileName = popupProfileForm.querySelector(".popup__item_el_name")
const popupProfileProf = popupProfileForm.querySelector(".popup__item_el_prof")

//Селектор темплейта
const newCardTemplate = document.querySelector("#card-template").content

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_visible",
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
]

// Функция первоначальной загрузки данных
function renderCards(initialCards) {
  initialCards.map((card) => {
    appendCard(card.name, card.link)
  })
}

// Функция создания новой карточки
function createNewCard(newPlace, imageSrc) {
  const newCard = newCardTemplate
    .querySelector(".elements__element")
    .cloneNode(true)
  newCard.querySelector(".elements__title").textContent = newPlace
  const newCardImage = newCard.querySelector(".elements__image")
  newCardImage.src = imageSrc
  newCardImage.alt = newPlace
  newCardImage.addEventListener("click", () => {
    openPopup(popupCardImage)
    showImagePopup(imageSrc, newPlace)
  })
  newCard.querySelector(".elements__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like_active")
  })
  newCard.querySelector(".elements__delete").addEventListener("click", () => {
    newCard.remove()
  })

  return newCard
}

// Функция добавления карточки в DOM
function appendCard(newPlace, imageSrc) {
  const newCard = createNewCard(newPlace, imageSrc)
  cardsContainer.insertAdjacentElement("afterbegin", newCard)
}

// Функция открытия popup
function openPopup(popup) {
  document.addEventListener("keydown", closePopupByEsc)
  popup.classList.add("popup_opened")
}

// Функция закрытия popup
function closePopup(popup) {
  document.removeEventListener("keydown", closePopupByEsc)
  popup.classList.remove("popup_opened")
}

// Функция редактирования профиля
function setProfileValues(newName, newProf) {
  nameProfile.textContent = newName
  profProfile.textContent = newProf
}

// Функция присваивающая значение полям popupImage
function showImagePopup(imageSrc, text, altText) {
  caption.textContent = text
  popupImage.src = imageSrc
  popupImage.alt = altText
}

// Функция закртия popup с помощью esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup)
  }
}

enableValidation(configValidation)
renderCards(initialCards)

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup)
    }
    if (evt.target.classList.contains("button_type_close")) {
      closePopup(popup)
    }
  })
})

buttonOpenPopupProfile.addEventListener("click", () => {
  popupProfileName.value = nameProfile.textContent
  popupProfileProf.value = profProfile.textContent
  openPopup(popupProfileForm)
})

buttonAddCard.addEventListener("click", () => {
  openPopup(popopCard)
})

popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  setProfileValues(popupProfileName.value, popupProfileProf.value)
  closePopup(popupProfileForm)
})

poupCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  appendCard(popupCardPlaceInput.value, popupCardImageInput.value)
  closePopup(popopCard)
  evt.target.reset()
})
