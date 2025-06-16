import * as mask from './vendor/imask.js';

import {
  sectionForm,
  inputName,
  inputPhone,
  inputCheckbox,
  submitButton
} from './dom-elements.js';

import {
  DataForValidation
} from './constants.js';

console.log(SlimSelect);

const phoneMask = new window.IMask(inputPhone, {
  mask: '+7 (000) 000-00-00'
});

const select = new SlimSelect({
  select: '#sectionSelect',
});


console.log(select);

let invalidInputsData = [inputName];

startValidation();

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
};

const showError = () => {
  const inputParent = invalidInputsData[0].DOM_INPUT.closest('.input');
  inputParent.classList.add('input--error');
  invalidInputsData[0].DOM_INPUT.setCustomValidity(invalidInputsData[0].ERROR);
  invalidInputsData[0].DOM_INPUT.reportValidity(invalidInputsData[0].ERROR);
};

function startValidation() {
  sectionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    isValid();
    blockSubmitButton();
    // if (!isValid()) {
    //   event.preventDefault();
    //         showError();
    // }
    // blockSubmitButton(false);
  });
}

const checkInputName = () => {
  const inputNameIsValid = DataForValidation[0].REG_EXP.test(inputName.value.trim());
  if (!inputNameIsValid) {
    invalidInputsData.push(DataForValidation[0].DOM_INPUT);
  }
  return inputNameIsValid;
};

const checkInputPhone = () => {
  const inputPhoneIsValid = inputPhone.value.trim() !== '';
  console.log(inputPhoneIsValid);
  if (!inputPhoneIsValid) {
    invalidInputsData.push(DataForValidation[1].DOM_INPUT);
  }
  return inputPhoneIsValid;
};

const checkInputCheckBox = () => {
  const inputCheckBox = inputCheckbox.checked;
  if (!inputCheckBox) {
    invalidInputsData.push(DataForValidation[2].DOM_INPUT);
  }
  return inputCheckBox;
};

function isValid() {
  invalidInputsData = [];
  checkInputName();
  checkInputPhone();
  checkInputCheckBox();

  console.log(invalidInputsData);

  return invalidInputsData[length - 1];
}

const removeError = (target) => {
  if (target.closest('.input').classList.contains('input--error')) {
    target.closest('.input').classList.remove('input--error');
    target.setCustomValidity(' ');
    target.reportValidity();
    target.blur();
    target.focus();
  }
};

invalidInputsData.forEach((input) => {
  input.addEventListener('input', (evt) => {
    removeError(evt.target);
  });
});

// inputs.forEach((input) => {
//     input.addEventListener('input', (evt) => {
//     input.value =
//   });
// })

