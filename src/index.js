import './index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard, createNewPlace} from './scripts/card.js';
import {openPopup, closePopup, closePopupEsc, closePopupOverlay, editProfile} from '../src/scripts/modal.js';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
export const card = cardTemplate.querySelector('.card');
export const cardList = document.querySelector('.places__list');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');

export const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');


const formEdit = document.forms['edit-profile'];
const nameEdit = formEdit.querySelector('.popup__input_type_name');
const descriptionEdit = formEdit.querySelector('.popup__input_type_description');

const formNewPlace = document.forms['new-place'];
const placeName = formNewPlace.querySelector('.popup__input_type_card-name');
const placeLink = formNewPlace.querySelector('.popup__input_type_url');



// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
  cardList.append(createCard(element.name, element.link, removeCard));
})


// open popup +++++++++++++ 
editButton.addEventListener('click', function(){ //edit
  openPopup(popupEdit);
  nameEdit.value = '';
  descriptionEdit.value = '';
});

addButton.addEventListener('click', function(){ // newcard
  openPopup(popupNewCard);
  placeName.value = '';
  placeLink.value = '';
});



// edit profile ++++++++++++++
formEdit.addEventListener('submit', function(evt){
  evt.preventDefault();
  editProfile(nameEdit.value, descriptionEdit.value);
  nameEdit.value = '';
  descriptionEdit.value = '';
  closePopup(popupEdit);
})

// add new place ++++++++++++++
formNewPlace.addEventListener('submit', function(evt){
  evt.preventDefault();
  createNewPlace(placeName.value, placeLink.value);
  placeName.value = '';
  placeLink.value = '';
  closePopup(popupNewCard);
})
