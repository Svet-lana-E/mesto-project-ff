const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '187e31d4-6e25-4812-bdb8-27a500552f6b',
    'Content-Type': 'application/json'
  }
}

//getting initial cards and used data

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

export const showResponseError = (err) => {
  console.log(err); // выводим ошибку в консоль
}

export const getInitialCards = () => {
  return fetch(configApi.baseUrl + '/cards', {
    headers: configApi.headers,
  })
  .then(handleResponse)
}

export const getUserData = () => {
  return fetch(configApi.baseUrl + '/users/me', {
    headers: configApi.headers,
  })
  .then(handleResponse)
}

// edit profile

export const editProfileApi = (title, description) => {
  return fetch(configApi.baseUrl + '/users/me', {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name: title,
      about: description,
    })
  })
  .then(handleResponse)
}

// add new card

export const createNewCardApi = (cardName, cardLink) => {
  return fetch(configApi.baseUrl + '/cards', {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
  .then(handleResponse)
}

// delete card

export const deleteCardApi = (card) => {
  return fetch(configApi.baseUrl + '/cards/' + card.dataset.cardId, {
    method: "DELETE",
    headers: configApi.headers,
    })
  .then(handleResponse)
}

// card like
export const setLike = (card) => {
  return fetch(configApi.baseUrl + '/cards/likes/' + card.dataset.cardId, {
    method: "PUT",
    headers: configApi.headers,
  })
  .then(handleResponse)
}

// card dislike

export const removeLike = (card) => {
  return fetch(configApi.baseUrl + '/cards/likes/' + card.dataset.cardId, {
    method: "DELETE",
    headers: configApi.headers,
  })
  .then(handleResponse)
}

// edit user avatar

export const editUserImage = (avatarLink) => {
  return fetch(configApi.baseUrl + '/users/me/avatar', {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    })
  })
  .then(handleResponse)
}