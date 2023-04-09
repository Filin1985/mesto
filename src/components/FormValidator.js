class FormValidator {
  constructor(validationConfig, formSelector) {
    this.validationConfig = validationConfig
    this._formElement = document.forms[formSelector]
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this.validationConfig['inputSelector'])
    )
    this._buttonElement = this._formElement.querySelector(
      this.validationConfig['submitButtonSelector']
    )
  }

  // Функция для добавления класса с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this.validationConfig['inputErrorClass'])
    errorElement.textContent = errorMessage
    errorElement.classList.add(this.validationConfig['errorClass'])
  }

  // Функция скрывающая ошибки при валидации форм
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this.validationConfig['inputErrorClass'])
    errorElement.classList.remove(this.validationConfig['errorClass'])
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
    this._toggleButtonState()
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState()
      }, 0)
    })
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement)
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
        this.validationConfig['inactiveButtonClass']
      )
    } else {
      this._buttonElement.disabled = false
      this._buttonElement.classList.remove(
        this.validationConfig['inactiveButtonClass']
      )
    }
  }
}

export default FormValidator
