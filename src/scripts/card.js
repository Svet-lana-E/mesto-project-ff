import {card, cardList} from '../index.js';

// @todo: Функция создания карточки

export function createCard(name, link, removeCard) {
  const cardElement = card.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardDeleteButton.addEventListener('click', function(){removeCard(cardElement)});
  return cardElement;
};

// @todo: Функция удаления карточки

export function removeCard(deletedCard) {
deletedCard.remove();
}

// add new Place +++++++++++
export function createNewPlace(name, link) {
  const newCardElement = card.cloneNode(true);
  newCardElement.querySelector('.card__title').textContent = name;
  newCardElement.querySelector('.card__image').src = link;
  newCardElement.querySelector('.card__image').alt = name;
  cardList.prepend(newCardElement);
}











  