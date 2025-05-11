import './index.css';
//import {initialCards} from './scripts/cards.js';
import {createCard, removeCard, likeButtonIsActive} from './scripts/card.js';
import {openPopup, closePopup, animatePopup, closeOverlayPopup, savingButtonInProcess} from '../src/scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getInitialCards, getUserData, editProfileApi, createNewCardApi, editUserImage} from './scripts/api.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

export const card = cardTemplate.querySelector('.card');
export const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditProfileImage = document.querySelector('.popup_type_edit-avatar');
const photoPopupImage = popupImage.querySelector('.popup__image');
const namePopupImage = popupImage.querySelector('.popup__caption');
const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const buttonAddNewPlace = profile.querySelector('.profile__add-button');
const profileDescription = profile.querySelector('.profile__description');
const profileTitle = profile.querySelector('.profile__title');
const profileImage = profile.querySelector('.profile__image');
const buttonEditProfileImage = profile.querySelector('.profile__edit-avatar');
const formEditProfile = document.forms['edit-profile'];
const formEditProfileAvatar = document.forms['edit-avatar'];
const inputLinkFormEditProfileAvatar = formEditProfileAvatar.querySelector('.popup__input_type_avatar_link');
const inputNameFormEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputDescriptionEditProfile = formEditProfile.querySelector('.popup__input_type_description');
const formNewPlace = document.forms['new-place'];
const inputNameFormNewPlace = formNewPlace.querySelector('.popup__input_type_card-name');
const inputLinkFormNewPlace = formNewPlace.querySelector('.popup__input_type_url');

// form validation config

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// fill-in profile
const fillProfileData = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  return profileTitle.textContent, profileDescription.textContent;
}

//getting initial card-list + user data API
Promise.all([getInitialCards(), getUserData()])
  .then(([initialCards, userData]) => {
    initialCards.forEach((card) => {
      cardList.append(createCard(card.name, card.link, card.likes, card._id, card.owner._id, userData._id, removeCard, likeButtonIsActive, openPopupCard));
    });
    fillProfileData(userData);
    profileImage.style = `background-image: url(${userData.avatar})`;
  })

// edit profile in editForm (method without API)
/*function editProfile(title, description) {
  profileTitle.textContent = title;
  profileDescription.textContent = description;
  return profileTitle.textContent, profileDescription.textContent;
}*/

// popup bigSize card

export function openPopupCard(popupImageName, popupImageLink) {
  namePopupImage.textContent = popupImageName;
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

// @todo: Вывести карточки на страницу (method without API)
/*initialCards.forEach(element => {
  cardList.append(createCard(element.name, element.link, removeCard, likeButtonIsActive, openPopupCard));
})*/

// open popup +++++++++++++ 

buttonEditProfile.addEventListener('click', function(){ //edit
  clearValidation(formEditProfile, validationConfig); 
  openPopup(popupEdit);
  inputNameFormEditProfile.value = profileTitle.textContent;
  inputDescriptionEditProfile.value = profileDescription.textContent;
  buttonEditProfile.blur();
});

buttonAddNewPlace.addEventListener('click', function(){ // newcard
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupNewCard);
  formNewPlace.reset();
  buttonAddNewPlace.blur();
});

buttonEditProfileImage.addEventListener('click', () => { // edit avatar
  clearValidation(formEditProfileAvatar, validationConfig);
  openPopup(popupEditProfileImage);
  buttonEditProfileImage.blur();
  inputLinkFormEditProfileAvatar.value = '';
});

// edit profile ++++++++++++++

formEditProfile.addEventListener('submit', function(evt){
  evt.preventDefault();
  savingButtonInProcess(formEditProfile) // остается надпись Сохранение...
  editProfileApi(inputNameFormEditProfile.value, inputDescriptionEditProfile.value)
    .then(fillProfileData)
    .then(closePopup(popupEdit));
})

// add new place ++++++++++++++

formNewPlace.addEventListener('submit', function(evt){
  evt.preventDefault();
  savingButtonInProcess(formNewPlace)
  Promise.all([createNewCardApi(inputNameFormNewPlace.value, inputLinkFormNewPlace.value), getUserData()])
    .then(([card, userData]) => {
      cardList.prepend(createCard(card.name, card.link, card.likes, card._id, card.owner._id, userData._id, removeCard, likeButtonIsActive, openPopupCard));
    })
    .then(closePopup(popupNewCard));
})

// form validation

enableValidation(validationConfig);

// edit user avatar

formEditProfileAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  savingButtonInProcess(formEditProfileAvatar)
  editUserImage(inputLinkFormEditProfileAvatar.value)
    .then(closePopup(popupEditProfileImage));
})