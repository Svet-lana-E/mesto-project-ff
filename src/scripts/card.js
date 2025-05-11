import {card} from '../index.js';
import {deleteCardApi, setLike, removeLike} from './api.js';
import {openPopup, closePopup} from './modal.js';

// @todo: Функция создания карточки

export function createCard(name, link, number, cardId, cardOwnerId, userId, removeCard, likeButtonIsActive, openPopupCard) {
  const cardElement = card.cloneNode(true);
  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__like-counter').textContent = number.length;
  cardElement.dataset.cardId = cardId;
  if(cardOwnerId !== userId) {
    buttonDeleteCard.style = 'display: none';
  }
  if(number.some(user => user._id === userId)) {
    buttonLikeCard.classList.add('card__like-button_is-active');
  }
  buttonDeleteCard.addEventListener('click', function(){removeCard(cardElement)});
  buttonLikeCard.addEventListener('click', function(){likeButtonIsActive(buttonLikeCard, cardElement)});
  cardImage.addEventListener('click', function(){openPopupCard(name, link)});
  return cardElement;
};

// @todo: Функция удаления карточки

export function removeCard(deletedCard) {
  const deleteConfirmPopup = document.querySelector('.popup_type_delete-confirm');
  const buttonConfirmDelete = deleteConfirmPopup.querySelector('.button');
  openPopup (deleteConfirmPopup);
  deletedCard.querySelector('.card__delete-button').blur(),
  buttonConfirmDelete.addEventListener('click', () => {
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
        likeButton.classList.remove('card__like-button_is-active'),
        likeButton.blur()
      )
  } else {
    setLike(card)
      .then((data) => {
        card.querySelector('.card__like-counter').textContent = data.likes.length;
      })
      .then(likeButton.classList.add('card__like-button_is-active'),
      likeButton.blur()
    )
  }
} 

