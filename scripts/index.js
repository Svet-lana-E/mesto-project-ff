// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const card = cardTemplate.querySelector('.card');
const cardImageLink = card.querySelector('.card__image');
const cardTitle = card.querySelector('.card__title');
const cardDeleteButton = card.querySelector('.card__delete-button');

const cardList = document.querySelector('.places__list');

console.log(card);
console.log(cardImageLink);
//console.log(cardTitle);
console.log(cardDeleteButton);
console.log(cardList);
console.log(initialCards);

// @todo: Функция создания карточки




function createCards(array) {
  array.forEach(element => {
    cardTitle.textContent = element.name;
    cardImageLink.src = element.link;
    const cardElement = card.cloneNode(true);
    cardList.append(cardElement);
  });
}



// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

createCards(initialCards);