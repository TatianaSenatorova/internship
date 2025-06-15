import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

import {
  programsSlider,
  programsSlides,
  programsSlidesList
} from './dom-elements';

import {
  MIN_SLIDES_NUMBER_DESKTOP_PROGRAMS,
  MIN_SLIDES_NUMBER_TABLET_PROGRAMS,
  DESKTOP_WIDTH,
  TABLET_WIDTH
} from './constants.js';

let programsSwiper;
const initQuantitySides = programsSlides.length;

export const initProgramsSlider = () => {
  programsSwiper = new Swiper('.swiper-programs', {
    modules: [Navigation, Scrollbar],
    direction: 'horizontal',
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 30,

    breakpoints: {
      768: {
        slidesPerView: 'auto',
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
        allowTouchMove: false,
      }
    },

    scrollbar: {
      el: '.programs-swiper-scrollbar',
      dragClass: 'scrollbar__drag',
      draggable: true,
    },

    navigation: {
      nextEl: '.swiper-button-programs-next',
      prevEl: '.swiper-button-programs-prev'
    }
  });
};

const windowWidth = document.documentElement.clientWidth;

onDomLoadedAddProgramsSlides(windowWidth);
initProgramsSlider();


export const onResizeDestroyProgramsSlider = () => {
  programsSwiper.destroy(true, true);
};

export function onDomLoadedAddProgramsSlides (windowWidth) {
  console.log('зашел')
  if (windowWidth < TABLET_WIDTH) {
    return;
  }
  let slideIndexToAdd = 0;
  const minQuantitySlides = windowWidth >= DESKTOP_WIDTH ? MIN_SLIDES_NUMBER_DESKTOP_PROGRAMS : MIN_SLIDES_NUMBER_TABLET_PROGRAMS;
  let slidesCounter = initQuantitySides;
  console.log('зашел', windowWidth, minQuantitySlides, slidesCounter);
  if (slidesCounter < minQuantitySlides) {
    while (slidesCounter < minQuantitySlides) {
      console.log('зашел', slidesCounter, minQuantitySlides);
      const сlone = programsSlides[slideIndexToAdd].cloneNode(true);
      programsSlidesList.insertAdjacentElement('beforeend', сlone);
      slidesCounter++;
      slideIndexToAdd++;
      if (slideIndexToAdd === (programsSlides.length - 1)) {
        slideIndexToAdd = 0;
      }
    }
  }
};

export const deleteAddedProgramsSlides = () => {
  const currentSlides = programsSlider.querySelectorAll('.programs__slider-item');
  currentSlides.forEach((slide, index) => {
    if (index >= initQuantitySides) {
      slide.remove();
    }
  });
};

