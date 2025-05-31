import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
// import {
//   slidesHero,
//   slidesHeroInfoContent,
//   heroPagination
// } from './dom-elements.js';

export const heroSwiper = new Swiper('.swiper-programs', {
  modules: [Navigation, Scrollbar],
  direction: 'horizontal',
  slidesPerView: 1,
  initialSlide: 0,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
      allowTouchMove: false,
    }

  },

  scrollbar: {
    el: '.programs-swiper-scrollbar',
    draggable: true,
    hide: false,
  },

  navigation: {
    nextEl: '.swiper-button-programs-next',
    prevEl: '.swiper-button-programs-prev'
  }
});

