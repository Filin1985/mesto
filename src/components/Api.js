class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(
      `Возникла ошибка ${res.status} при запросу к ${this.url}`
    )
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse)
  }
}

export const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c750cc95-4563-4f0a-9bd8-3b5e3b84a4af',
    'Content-Type': 'application/json',
  },
})