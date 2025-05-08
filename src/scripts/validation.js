//show form validation error

const showInputError = (formElement, element, config, errorMessage) => {
  const errorElement = formElement.querySelector(`.${element.id}-error`);
  element.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}
 
//hide form validation error

const hideInputError = (formElement, element, config) => {
  const errorElement = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// all inputs validation checking

const isValid = (formElement, element, config) => {
  if (element.validity.patternMismatch) {
    element.setCustomValidity(element.dataset.errorMessage);
  } else {
    element.setCustomValidity('');
  }
  if(!element.validity.valid) {
    showInputError(formElement, element, config, element.validationMessage);
  } else {
    hideInputError(formElement, element, config)
  }
}

//all inputs setting eventlistener

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);

    })
  })
}

//form validation initializing

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners (formElement, config);
  })
}

//any invalid input checking

const hasInvalidInput =(inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// form button condition toggling

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

//form validation clearing

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const errorElementList = Array.from(formElement.querySelectorAll(`.${config.errorClass}`));
  inputList.forEach((element) => {
    element.classList.remove(config.inputErrorClass);
  });
  errorElementList.forEach((errorElement) => {
    console.log(errorElement);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  })
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}
