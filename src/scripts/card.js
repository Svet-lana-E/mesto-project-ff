import {card} from '../index.js';
import {deleteCardApi, setLike, removeLike} from './api.js';
import {openPopup, closePopup} from './modal.js';

// @todo: Функция создания карточки

export function createCard(name, link, number, cardId, cardOwnerId, userId, removeCard, likeButtonIsActive, openPopupCard) {
  const cardElement = card.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__like-counter').textContent = number.length;
  cardElement.dataset.cardId = cardId;
  if(cardOwnerId !== userId) {
    cardDeleteButton.style = 'display: none';
  }
  if(number.some(user => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardDeleteButton.addEventListener('click', function(){removeCard(cardElement)});
  cardLikeButton.addEventListener('click', function(){likeButtonIsActive(cardLikeButton, cardElement)});
  cardImage.addEventListener('click', function(){openPopupCard(name, link)});
  return cardElement;
};

// @todo: Функция удаления карточки

export function removeCard(deletedCard) {
  const deleteConfirmPopup = document.querySelector('.popup_type_delete-confirm');
  const deleteConfirmButton = deleteConfirmPopup.querySelector('.button');
  openPopup (deleteConfirmPopup);
  deletedCard.querySelector('.card__delete-button').blur(),
  deleteConfirmButton.addEventListener('click', () => {
    deleteCardApi(deletedCard)
    .then(
      deletedCard.remove(),
      closePopup(deleteConfirmPopup),
    );
  });
}

// card likeButton is active

export function likeButtonIsActive(likeButton, card) {
  if(likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(card)
      .then((data) => {
        card.querySelector('.card__like-counter').textContent = data.likes.length;
      })
      .then(
        likeButton.classList.remove('card__like-button_is-active'))
  } else {
    setLike(card)
      .then((data) => {
        card.querySelector('.card__like-counter').textContent = data.likes.length;
      })
      .then(likeButton.classList.add('card__like-button_is-active'))
  }
} 

