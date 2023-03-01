// Селекторы кнопок
const editProfileOpenButton = document.querySelector(".button_type_edit")
const closeEditProfileButton = document.querySelector(".button_type_close")

// Селектор popup
const popupProfileForm = document.querySelector(".popup")

// Селекторы полей профиля
let nameProfile = document.querySelector(".profile__name")
let profProfile = document.querySelector(".profile__prof")

// Селекторы полей профиля
const nameProfileInput = document.querySelector(".popup__name")
const profProfileInput = document.querySelector(".popup__prof")

editProfileOpenButton.addEventListener("click", openPopup)

closeEditProfileButton.addEventListener("click", closePopup)

popupProfileForm.addEventListener("submit", (e) => {
  e.preventDefault()
  editProfileData(nameProfileInput.value, profProfileInput.value)
})

// Функция открытия popup
function openPopup() {
  popupProfileForm.classList.add("popup_opened")
}

// Функция закрытия popup
function closePopup() {
  popupProfileForm.classList.remove("popup_opened")
}

// Функция редактирования профиля
function editProfileData(newName, newProf) {
  nameProfile.textContent = newName
  profProfile.textContent = newProf
  closePopup()
}
