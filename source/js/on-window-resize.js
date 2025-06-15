import {
  onResizeUpdateHeroSlider
} from './hero-slider.js';

import {
  onResizeDestroyProgramsSlider,
  onDomLoadedAddProgramsSlides,
  deleteAddedProgramsSlides,
  initProgramsSlider
} from './programs-slider.js';


import {
  DESKTOP_WIDTH,
  TABLET_WIDTH
} from './constants.js';

let windowWidth = document.documentElement.clientWidth;

const onWindowResize = () => {
  const currentWindowWidth = document.documentElement.clientWidth;
  if ((currentWindowWidth < TABLET_WIDTH && windowWidth < TABLET_WIDTH) || (currentWindowWidth >= DESKTOP_WIDTH && windowWidth >= DESKTOP_WIDTH) ||
    ((currentWindowWidth >= TABLET_WIDTH && currentWindowWidth < DESKTOP_WIDTH && windowWidth >= TABLET_WIDTH && windowWidth < DESKTOP_WIDTH))) {
    windowWidth = currentWindowWidth;
    return;
  }
  windowWidth = document.documentElement.clientWidth;
  onResizeUpdateHeroSlider();
  onResizeDestroyProgramsSlider();
  deleteAddedProgramsSlides();
  onDomLoadedAddProgramsSlides(windowWidth);
  initProgramsSlider();
};

window.addEventListener('resize', onWindowResize);
