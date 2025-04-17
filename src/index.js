import './index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard, likeButtonIsActive} from './scripts/card.js';
import {openPopup, closePopup, animatePopup, closeOverlayPopup} from '../src/scripts/modal.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

export const card = cardTemplate.querySelector('.card');
export const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const photoPopupImage = popupImage.querySelector('.popup__image');
const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const buttonAddNewPlace = profile.querySelector('.profile__add-button');
const profileDesctiption = profile.querySelector('.profile__description');
const profileTitle = profile.querySelector('.profile__title');
const formEditProfile = document.forms['edit-profile'];
const inputNameFormEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputDescriptionEditProfile = formEditProfile.querySelector('.popup__input_type_description');
const formNewPlace = document.forms['new-place'];
const inputNameFormNewPlace = formNewPlace.querySelector('.popup__input_type_card-name');
const inputLinkFormNewPlace = formNewPlace.querySelector('.popup__input_type_url');

// edit profile in editForm ++++++++++++

function editProfile(title, description) {
  profileTitle.textContent = title;
  profileDesctiption.textContent = description;
  return profileTitle.textContent, profileDesctiption.textContent;
}

// popup bigSize card

export function openPopupCard(popupImageName, popupImageLink) {
  popupImage.querySelector('.popup__caption').textContent = popupImageName;
  photoPopupImage.src = popupImageLink;
  photoPopupImage.alt = popupImageName;
  openPopup(popupImage);
} 

// popups animation

popups.forEach(function(element) {
  animatePopup(element);
  addEventListener('click', closeOverlayPopup);
  const buttonClosePopup = element.querySelector('.popup__close');
  buttonClosePopup.addEventListener('click', function(){
    closePopup(element)}
  );
});

// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
  cardList.append(createCard(element.name, element.link, removeCard, likeButtonIsActive, openPopupCard));
})

// open popup +++++++++++++ 

buttonEditProfile.addEventListener('click', function(){ //edit
  openPopup(popupEdit);
  inputNameFormEditProfile.value = profileTitle.textContent;
  inputDescriptionEditProfile.value = profileDesctiption.textContent;
});

buttonAddNewPlace.addEventListener('click', function(){ // newcard
  openPopup(popupNewCard);
  formNewPlace.reset();
});

// edit profile ++++++++++++++

formEditProfile.addEventListener('submit', function(evt){
  evt.preventDefault();
  editProfile(inputNameFormEditProfile.value, inputDescriptionEditProfile.value);
  closePopup(popupEdit);
})

// add new place ++++++++++++++

formNewPlace.addEventListener('submit', function(evt){
  evt.preventDefault();
  cardList.prepend(createCard(inputNameFormNewPlace.value, inputLinkFormNewPlace.value, removeCard, likeButtonIsActive, openPopupCard));
  closePopup(popupNewCard);
})
