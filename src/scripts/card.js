import {card} from '../index.js';
import {showResponseError, setLike, removeLike} from './api.js';

// @todo: Функция создания карточки

export function createCard(name, link, number, cardId, cardOwnerId, userId, likeButtonIsActive, openDeleteConfirmPopup, openPopupCard) {
  const cardElement = card.cloneNode(true);
  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__like-counter').textContent = number.length;
  cardElement.dataset.cardId = cardId;
  if(cardOwnerId !== userId) {
    cardElement.querySelector('.card__delete-button').style = 'display: none';
  }
  buttonDeleteCard.addEventListener('click', (evt) => {
    evt.preventDefault();
    openDeleteConfirmPopup(evt.target.closest('li'));
    buttonDeleteCard.blur();
  });
  if(number.some(user => user._id === userId)) {
    buttonLikeCard.classList.add('card__like-button_is-active');
  }
  buttonLikeCard.addEventListener('click', function(){
    likeButtonIsActive(buttonLikeCard, cardElement);
    buttonLikeCard.blur();
  });
  cardImage.addEventListener('click', function(){openPopupCard(name, link)});
  return cardElement;
};

// card likeButton is active

export function likeButtonIsActive(likeButton, card) {
  if(likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(card)
      .then((data) => {
        card.querySelector('.card__like-counter').textContent = data.likes.length;
      })
      .then(() => {
        likeButton.classList.remove('card__like-button_is-active')
      })
      .catch(showResponseError)
  } else {
    setLike(card)
      .then((data) => {
        card.querySelector('.card__like-counter').textContent = data.likes.length;
      })
      .then(() => {
        likeButton.classList.add('card__like-button_is-active')
      })
      .catch(showResponseError)
  }
} 

