// Функция открытия popup
export function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc)
  const errorElement = popup.querySelectorAll('.popup__item-error')
  errorElement.forEach((element) => {
    element.textContent = ''
  })
  popup.classList.add('popup_opened')
}

// Функция закрытия popup
export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc)
  popup.classList.remove('popup_opened')
}

// Функция закрытия popup с помощью esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}
