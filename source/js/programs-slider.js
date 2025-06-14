import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
// import {
//   slidesHero,
//   slidesHeroInfoContent,
//   heroPagination
// } from './dom-elements.js';

export const programsSwiper = new Swiper('.swiper-programs', {
  modules: [Navigation, Scrollbar],
  direction: 'horizontal',
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 30,
  //  grid: {
  //       rows: 1,
  //       // fill: 'row',
  //   },
  // grid: {
  //     rows: 1, // Количество строк
  //     perRow: 2, // Количество слайдов в каждой строке (или по-другому, columns)
  //     gutter: 20, // Расстояние между слайдами (gap)
  //   },

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
