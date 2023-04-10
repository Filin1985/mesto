class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig
    this._formElement = formElement
    this._inputList = Array.from(
      this._formElement.querySelectorAll(
        this._validationConfig['inputSelector']
      )
    )
    this._buttonElement = this._formElement.querySelector(
      this._validationConfig['submitButtonSelector']
    )
  }

  // Функция для добавления класса с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._validationConfig['inputErrorClass'])
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._validationConfig['errorClass'])
  }

  // Функция скрывающая ошибки при валидации форм
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._validationConfig['inputErrorClass'])
    errorElement.classList.remove(this._validationConfig['errorClass'])
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
  _setEventListener() {
    this._toggleButtonState()
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState()
      }, 0)
    })
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement)
        this._toggleButtonState()
      })
    })
  }

  // Функция добавления обработчиков всем формам
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListener(this._formElement)
  }

  resetInputErrors() {
    const errorElement =
      this._formElement.querySelectorAll('.popup__item-error')
    errorElement.forEach((element) => {
      element.textContent = ''
    })
  }

  // Функция показывающая кнопке валидна ли форма
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  // Функция меняющая состояние кнопки в зависимости от валидности формы
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true
      this._buttonElement.classList.add(
        this._validationConfig['inactiveButtonClass']
      )
    } else {
      this._buttonElement.disabled = false
      this._buttonElement.classList.remove(
        this._validationConfig['inactiveButtonClass']
      )
    }
  }
}

export default FormValidator
