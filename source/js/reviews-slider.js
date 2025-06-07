import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

export const reviewsSwiper = new Swiper('.swiper-reviews', {
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
      slidesPerView: 2,
    }
  },

  scrollbar: {
    el: '.reviews-swiper-scrollbar',
    dragClass: 'scrollbar__drag',
    draggable: true,
  },

  navigation: {
    nextEl: '.swiper-button-reviews-next',
    prevEl: '.swiper-button-reviews-prev'
  }
});

