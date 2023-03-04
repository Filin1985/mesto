// Селекторы кнопок
const editProfileOpenButton = document.querySelector(".button_type_edit");
const closeButtons = document.querySelectorAll(".button_type_close");
const addCardButton = document.querySelector(".button_type_add");

// Селектор контейнар для карточек
const cardsContainer = document.querySelector(".elements__list");

// Селекторы popup
const popupProfileForm = document.querySelector("#popup-user");
const poupCardWindow = document.querySelector("#popup-card");
const popupCardImage = document.querySelector("#popup-image");

// Селектор формы новой карточки
const poupCardForm = poupCardWindow.querySelector(".popup__form");

// Селекторы полей popupCardImage
const caption = popupCardImage.querySelector(".popup__caption");
const popupImage = popupCardImage.querySelector(".popup__photo");

// Селекторы полей poupCardForm
const newPlaceInput = poupCardForm.querySelector(".popup__item_el_name");
const newImageInput = poupCardForm.querySelector(".popup__item_el_prof");

// Селекторы полей профиля
let nameProfile = document.querySelector(".profile__name");
let profProfile = document.querySelector(".profile__prof");

// Селекторы полей popup профиля
const nameProfileInput = popupProfileForm.querySelector(".popup__item_el_name");
const profProfileInput = popupProfileForm.querySelector(".popup__item_el_prof");

//Селектор темплейта
const newCardTemplate = document.querySelector("#card-template").content;

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
];

// Функция первоначальной загрузки данных
function renderCards(initialCards) {
  initialCards.map((card) => {
    appendCard(card.name, card.link);
  });
}

// Функция создания новой карточки
function createNewCard(newPlace, imageSrc) {
  const newCard = newCardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  console.log(newCard);
  newCard.querySelector(".elements__title").textContent = newPlace;
  const newCardImage = newCard.querySelector(".elements__image");
  newCardImage.src = imageSrc;
  newCardImage.alt = newPlace;
  newCardImage.addEventListener("click", () => {
    openPopup(popupCardImage);
    showImagePopup(imageSrc, newPlace, newPlace);
  });
  newCard.querySelector(".elements__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like_active");
  });
  newCard.querySelector(".elements__delete").addEventListener("click", () => {
    newCard.remove();
  });

  return newCard;
}

// Функция добавления карточки в DOM
function appendCard(newPlace, imageSrc) {
  console.log(imageSrc);
  const newCard = createNewCard(newPlace, imageSrc);
  cardsContainer.insertAdjacentElement("afterbegin", newCard);
}

// Функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Функция редактирования профиля
function setProfileValues(newName, newProf) {
  nameProfile.textContent = newName;
  profProfile.textContent = newProf;
}

// Функция присваивающая значение полям popupImage
function showImagePopup(imageSrc, text, altText) {
  caption.textContent = text;
  popupImage.src = imageSrc;
  popupImage.alt = altText;
}

renderCards(initialCards);

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
});

editProfileOpenButton.addEventListener("click", () => {
  nameProfileInput.value = nameProfile.textContent;
  profProfileInput.value = profProfile.textContent;
  openPopup(popupProfileForm);
});

addCardButton.addEventListener("click", () => {
  openPopup(poupCardWindow);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  setProfileValues(nameProfileInput.value, profProfileInput.value);
  closePopup(popupProfileForm);
});

poupCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  appendCard(newPlaceInput.value, newImageInput.value);
  evt.target.reset();
  closePopup(poupCardWindow);
});
