import {
  onResizeUpdateHeroSlider
} from './hero-slider.js';

import {
  onResizeUpdateProgramsSlider,
  onDomLoadedAddProgramsSlides,
  deleteAddedProgramsSlides
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
  onResizeUpdateProgramsSlider();
  deleteAddedProgramsSlides();
  onDomLoadedAddProgramsSlides(windowWidth);
};

window.addEventListener('resize', onWindowResize);
