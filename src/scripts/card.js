import {card} from '../index.js';
import {deleteCardApi} from './api.js';

// @todo: Функция создания карточки

export function createCard(name, link, number, cardOwnerId, userId, removeCard, likeButtonIsActive, openPopupCard) {
  const cardElement = card.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if(cardOwnerId !== userId) {
    cardDeleteButton.style = 'display: none';
  }
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__like-counter').textContent = number.length;
  cardDeleteButton.addEventListener('click', function(){removeCard(cardElement)});
  cardLikeButton.addEventListener('click', function(){likeButtonIsActive(cardLikeButton)});
  cardImage.addEventListener('click', function(){openPopupCard(name, link)});
  return cardElement;
};

// @todo: Функция удаления карточки

export function removeCard(deletedCard) {
  //deleteCardApi(deletedCard)
    //.then((deletedCard) => {
      deletedCard.remove();
    }
  //)
  
//}

// card likeButton is active

export function likeButtonIsActive(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

/*export const showDeleteButton = (userId, card) => {
  const cardDeleteButton = card.querySelector('.card__delete-button');

  if(!userId === cardId) {

  }
}*/