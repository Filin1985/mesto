// Селекторы кнопок
const editProfileOpenButton = document.querySelector(".button_type_edit");
const closeEditProfileButton = document.querySelector(".button_type_close");

// Селектор popup
const popupProfileForm = document.querySelector(".popup");

// Селекторы полей профиля
let nameProfile = document.querySelector(".profile__name");
let profProfile = document.querySelector(".profile__prof");

// Селекторы полей popup профиля
const nameProfileInput = popupProfileForm.querySelector(".popup__item_el_name");
const profProfileInput = popupProfileForm.querySelector(".popup__item_el_prof");

editProfileOpenButton.addEventListener("click", () => {
  nameProfileInput.value = nameProfile.textContent;
  profProfileInput.value = profProfile.textContent;
  openPopup();
});

closeEditProfileButton.addEventListener("click", closePopup);

popupProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  setProfileValues(nameProfileInput.value, profProfileInput.value);
  closePopup();
});

// Функция открытия popup
function openPopup() {
  popupProfileForm.classList.add("popup_opened");
}

// Функция закрытия popup
function closePopup() {
  popupProfileForm.classList.remove("popup_opened");
}

// Функция редактирования профиля
function setProfileValues(newName, newProf) {
  nameProfile.textContent = newName;
  profProfile.textContent = newProf;
}
