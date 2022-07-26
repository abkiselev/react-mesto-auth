class Api {
  constructor({ baseUrl, headers }){
      this._url = baseUrl;
      this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(res.json()); 
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
      })
      .then(res => this._getResponseData(res))
  }

  createNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => this._getResponseData(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }


  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
      })
      .then(res => this._getResponseData(res))
  }

  changeProfileInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => this._getResponseData(res))
  }

  changeProfileAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => this._getResponseData(res))
  }

  setCardLike(cardId, method) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(res => this._getResponseData(res))
  }

  login({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(res => this._getResponseData(res))
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res))
  }
  
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'a8aa5636-0a20-425d-9a78-90b6247fe762',
    'Content-Type': 'application/json'
  }
});

export const apiAuth = new Api({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

// export default api;