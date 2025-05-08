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

const showResponseError = (err) => {
  console.log(err); // выводим ошибку в консоль
}

export const getInitialCards = () => {
  return fetch(configApi.baseUrl + '/cards', {
    headers: configApi.headers,
  })
  .then(handleResponse)
  .catch(showResponseError)
}

export const getUserData = () => {
  return fetch(configApi.baseUrl + '/users/me', {
    headers: configApi.headers,
  })
  .then(handleResponse)
  .catch(showResponseError)
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
  .catch(showResponseError)
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
  .catch(showResponseError)
}