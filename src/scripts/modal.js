// popup animation function

export function animatePopup(popup) {
  popup.classList.add('popup_is-animated');
}

// popup open + add eventListener Esc +++++++++

export function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
}

//close popup +++++++++++++

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup);
}

// close  popup with Esc

function closeEscPopup(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}

// close popup through overlay +++++++++++

export function closeOverlayPopup(evt) {
  if (evt.target.classList.contains('popup_is-opened')){
    closePopup(evt.target);
  }
}