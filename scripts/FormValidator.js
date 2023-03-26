class FormValidator {
  constructor(validationObject, formElement) {
    this._validationObject = validationObject
    this._formElement = formElement
  }

  // Функция для добавления класса с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._validationObject['inputErrorClass'])
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._validationObject['errorClass'])
  }

  // Функция скрывающая ошибки при валидации форм
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._validationObject['inputErrorClass'])
    errorElement.classList.remove(this._validationObject['errorClass'])
    errorElement.textContent = ''
  }

  // Функция для проверки валидности полей
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      )
    } else {
      this._hideInputError(formElement, inputElement)
    }
  }

  // Функция добавления обработчика всем полям формы и активации кнопки
  _setEventListener(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._validationObject['inputSelector'])
    )
    const buttonElement = formElement.querySelector(
      this._validationObject['submitButtonSelector']
    )
    this._toggleButtonState(inputList, buttonElement)
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement)
      }, 0)
    })
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  // Функция добавления обработчиков всем формам
  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this._validationObject['formSelector'])
    )
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })
      this._setEventListener(formElement)
    })
  }

  // Функция показывающая кнопке валидна ли форма
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  // Функция меняющая состояние кнопки в зависимости от валидности формы
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true
      buttonElement.classList.add(this._validationObject['inactiveButtonClass'])
    } else {
      buttonElement.disabled = false
      buttonElement.classList.remove(
        this._validationObject['inactiveButtonClass']
      )
    }
  }
}

export default FormValidator
