import {popupImage, profileDesctiption, profileTitle} from "../index.js"; 

//popup is animated
export function animatePopup(popup){
  popup.classList.add('popup_is-animated');
}

// popup open + add eventListeners +++++++++
export function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', function(){
    closePopup(popup)}
  );
}

// close  popup with Esc (не закрывает если введет какой л текст в форму)
export function closePopupEsc(evt) {
  const elem = document.getElementsByClassName('popup_is-opened');
  if(evt.key === 'Escape') {
   for(let i = 0; i < elem.length; i++) {
    elem[i].classList.remove('popup_is-opened');
   }
  }
  window.removeEventListener('keydown', closePopupEsc);
}

// close popup through overlay +++++++++++
export function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')){
    evt.target.classList.remove('popup_is-opened');
  }
}

//close popup with button +++++++++++++
export function closePopup(popup) {
  if (popup.classList.contains('popup_is-opened')){
    popup.classList.remove('popup_is-opened');
  }
}

// edit profile in editForm ++++++++++++
export function editProfile(title, description) {
  profileTitle.textContent = title;
  profileDesctiption.textContent = description;
  return profileTitle.textContent, profileDesctiption.textContent;
}

// popup card

export function popupCard(popupImageName, popupImageLink) {
  openPopup(popupImage);
  popupImage.querySelector('.popup__caption').textContent = popupImageName;
  popupImage.querySelector('.popup__image').src = popupImageLink;
  popupImage.querySelector('.popup__image').alt = popupImageName;
} 




 






