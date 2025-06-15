import {
  onDomLoadedAddProgramsSlides
} from './programs-slider.js';

const windowWidth = document.documentElement.clientWidth;

const onDocumentDomContentLoaded = () => {
  onDomLoadedAddProgramsSlides(windowWidth);
};

document.addEventListener('DOMContentLoaded', onDocumentDomContentLoaded);
