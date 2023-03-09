// Функция выводящяя ошибки при валидации форм
function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(obj["inputErrorClass"])
  errorElement.textContent = errorMessage
  errorElement.classList.add(obj["errorClass"])
}

// Функция скрывающая ошибки при валидации форм
function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(obj["inputErrorClass"])
  errorElement.classList.remove(obj["errorClass"])
  errorElement.textContent = ""
}

// Функция для проверки валидности полей
function checkInputValidity(formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    )
  } else {
    hideInputError(formElement, inputElement, obj)
  }
}

// Функция добавления обработчика всем полям формы и активации кнопки
function setEventListener(formElement, obj) {
  const inputList = Array.from(
    formElement.querySelectorAll(obj["inputSelector"])
  )
  const buttonElement = formElement.querySelector(obj["submitButtonSelector"])
  toggleButtonState(inputList, buttonElement, obj)
  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, obj)
    }, 0)
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, obj)
      toggleButtonState(inputList, buttonElement, obj)
    })
  })
}

// Функция добавления обработчиков всем формам
export function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj["formSelector"]))
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault()
    })
    setEventListener(formElement, obj)
  })
}

// Функция показывающая кнопке валидна ли форма
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// Функция меняющая состояние кнопки в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(obj["inactiveButtonClass"])
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(obj["inactiveButtonClass"])
  }
}
