import * as mask from './vendor/imask.js';

import {
  sectionForm,
  inputName,
  inputPhone,
  inputCheckbox,
  submitButton
} from './dom-elements.js';

import {
  DataForValidationName,
  DataForValidationPhone,
  DataForValidationCheckbox
} from './constants.js';

export const phoneMask = new window.IMask(inputPhone, {
  mask: '+7 (000) 000-00-00'
});

let invalidInputsData = [];

startValidation();

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
};

const onInputRemoveError = (evt) => {
  evt.target.closest('.input').classList.remove('input--error');
  evt.target.setCustomValidity(' ');
  evt.target.reportValidity();
  evt.target.blur();
  evt.target.focus();
};

const showError = () => {
  let inputLabel;
  const input = invalidInputsData[0][0];
  if (input.type === 'checkbox') {
    inputLabel = input.closest('.checkbox');
    inputLabel.classList.add('checkbox--error');
  } else {
    inputLabel = input.closest('.input');
    inputLabel.classList.add('input--error');
  }
  input.setCustomValidity(invalidInputsData[0][1]);
  input.reportValidity(invalidInputsData[0][1]);
  input.addEventListener('input', onInputRemoveError);
};

function startValidation() {
  sectionForm.addEventListener('submit', (event) => {
    blockSubmitButton();
    if (isValid()) {
      event.preventDefault();
      showError();
    }
    blockSubmitButton(false);
  });
}

const checkInputName = () => {
  const inputNameIsValid = DataForValidationName.REG_EXP.test(inputName.value.trim());
  if (!inputNameIsValid) {
    invalidInputsData.push([inputName, DataForValidationName.ERROR]);
  }
  return inputNameIsValid;
};

const checkInputPhone = () => {
  const inputPhoneIsValid = DataForValidationPhone.REG_EXP.test(inputPhone.value.trim());
  if (!inputPhoneIsValid) {
    invalidInputsData.push([inputPhone, DataForValidationPhone.ERROR]);
  }
  return inputPhoneIsValid;
};

const checkInputCheckBox = () => {
  const inputCheckBox = inputCheckbox.checked;
  if (!inputCheckBox) {
    invalidInputsData.push([inputCheckbox, DataForValidationCheckbox.ERROR]);
  }
  return inputCheckBox;
};

function isValid() {
  invalidInputsData = [];
  checkInputName();
  checkInputPhone();
  checkInputCheckBox();
  return invalidInputsData;
}

const onInput = (evt) => {
  const value = evt.target.value.replace(/[0-9]/g, '');
  evt.target.value = value;
};

inputName.addEventListener('input', onInput);
