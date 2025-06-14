import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

import {
  programsSlider,
  programsSlides,
  programsSlidesList
} from './dom-elements';
import {
  MIN_SLIDES_NUMBER_DESKTOP_PROGRAMS
} from './constants.js';

let programsSwiper;

const initSlider = () => {
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
}

initSlider();

export const onResizeUpdateProgramsSlider = () => {
  programsSwiper.destroy(true, true);
  initSlider();
};

export const onDomLoadedAddProgramsSlides = () => {
  let slidesCounter = programsSlides.length;
  console.log(programsSlides[0])
  if (slidesCounter < MIN_SLIDES_NUMBER_DESKTOP_PROGRAMS) {
    while (slidesCounter < MIN_SLIDES_NUMBER_DESKTOP_PROGRAMS) {
      const сlone = programsSlides[0].cloneNode(true);
      programsSlidesList.insertAdjacentElement('beforeend', сlone);
      slidesCounter++;
  console.log(slidesCounter)
    }
  }
};

