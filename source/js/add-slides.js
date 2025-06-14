import {
  onDomLoadedAddProgramsSlides
} from './programs-slider.js';
import {
  DESKTOP_WIDTH
} from './constants.js';



const windowWidth = document.documentElement.clientWidth;

const onDocumentDomContentLoaded = () => {
  if ( windowWidth >= DESKTOP_WIDTH) {
    onDomLoadedAddProgramsSlides();
  } else if (windowWidth < TABLET_WIDTH) {

  }
};


document.addEventListener('DOMContentLoaded', onDocumentDomContentLoaded);
