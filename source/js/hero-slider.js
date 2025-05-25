import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { slidesHero } from './dom-elements.js';

export const heroSwiper = new Swiper('.swiper-hero', {
  modules: [Pagination],
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  initialSlide: 0,

  breakpoints: {
    1440: {
      allowTouchMove: false,
    }
  },

  pagination: {
    el: '.hero__slider-pagination',
    bulletClass: 'hero__pagination-control',
    bulletActiveClass: 'hero__pagination-control--is-active',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, bulletClass) {
      return `<button class=${bulletClass}><span class="visually-hidden">Перейти к слайду ${index + 1
      }</span></button>`;
    },
    enabled: true,
  },
});

const unfocusNonActiveSlides = () => {
  slidesHero.forEach((slide, index) => {
    if (index === heroSwiper.activeIndex) {
      slide.querySelector('.hero-card__primary-button').removeAttribute('tabindex');
    } else {
      slide.querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
    }
  });
};

heroSwiper.on('slideChange', unfocusNonActiveSlides);
