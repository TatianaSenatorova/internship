import {
  buttonOpenModal,
  modal,
  modalForm
} from './dom-elements.js';
import {
  isEscapeKey
} from './utils.js';


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onDocumentlClick = (evt) => {
  if (evt.target.closest('.modal__close-button') || !evt.target.closest('.modal__content')) {
    closeModal();
  }
}

const onButtonOpenModalClick = (evt) => {
  evt.stopPropagation();
  modal.classList.add('modal--is-opened');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentlClick);
}

const clearForm = () => {
  modalForm.reset();
};

function closeModal() {
  modal.classList.remove('modal--is-opened');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentlClick);
  clearForm();
}

buttonOpenModal.addEventListener('click', onButtonOpenModalClick);


