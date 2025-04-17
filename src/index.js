import './index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard, likeButtonIsActive} from './scripts/card.js';
import {openPopup, closePopup, editProfile, popupCard, animatePopup} from '../src/scripts/modal.js';


// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

export const card = cardTemplate.querySelector('.card');
export const cardList = document.querySelector('.places__list');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
export const profileTitle = profile.querySelector('.profile__title');
export const profileDesctiption = profile.querySelector('.profile__description');
const formEdit = document.forms['edit-profile'];
const nameEdit = formEdit.querySelector('.popup__input_type_name');
const descriptionEdit = formEdit.querySelector('.popup__input_type_description');
const formNewPlace = document.forms['new-place'];
const placeName = formNewPlace.querySelector('.popup__input_type_card-name');
const placeLink = formNewPlace.querySelector('.popup__input_type_url');
const popups = document.querySelectorAll('.popup');

// popups animation

popups.forEach(element => animatePopup(element));

// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
  cardList.append(createCard(element.name, element.link, removeCard, likeButtonIsActive, popupCard));
})

// open popup +++++++++++++ 

editButton.addEventListener('click', function(){ //edit
  openPopup(popupEdit);
  nameEdit.value = profileTitle.textContent;
  descriptionEdit.value = profileDesctiption.textContent;
  nameEdit.addEventListener('click', function(){
    nameEdit.value = '';
  })
  descriptionEdit.addEventListener('click', function(){
    descriptionEdit.value = '';
  })
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
  closePopup(popupEdit);
})

// add new place ++++++++++++++

formNewPlace.addEventListener('submit', function(evt){
  evt.preventDefault();
  cardList.prepend(createCard(placeName.value, placeLink.value, removeCard, likeButtonIsActive, popupCard));
  closePopup(popupNewCard);
})
