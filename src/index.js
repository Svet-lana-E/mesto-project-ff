import './index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const card = cardTemplate.querySelector('.card');
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(name, link, removeCard) {
    const cardElement = card.cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardDeleteButton.addEventListener('click', function(){removeCard(cardElement)});
    return cardElement;
  };

// @todo: Функция удаления карточки

function removeCard(deletedCard) {
  deletedCard.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
  cardList.append(createCard(element.name, element.link, removeCard));
})