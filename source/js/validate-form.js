import * as mask from './vendor/imask.js';

import {
  sectionForm,
  inputName,
  inputPhone,
  submitButton
} from './dom-elements.js';

import {
  DataForValidation
} from './constants.js';

const phoneMask = new window.IMask(inputPhone, {
    mask: '+7 (000) 000-00-00'
  });

console.log(phoneMask);

const inputs = [inputName, inputPhone];

let invalidInputsData = [inputName, inputPhone];
console.log(DataForValidation[1].REG_EXP.test(inputName.value.trim()))

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
    blockSubmitButton();
    if (!isValid()) {
      event.preventDefault();
      showError();
    }
    blockSubmitButton(false);
  });
}

function isValid() {
  invalidInputsData = [];
  DataForValidation.forEach((element) => {
       if (!(element.REG_EXP.test(element.DOM_INPUT.value.trim()))) {
      element.VALID = !element.VALID;
      invalidInputsData.push(element);
        console.log(invalidInputsData)
    }
  });
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

