import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import {
  //   slidesHero,
  //   slidesHeroInfoContent,
  //   heroPagination
} from './dom-elements.js';
import {
  // HTML_FOR_PAGINATION
} from './constants.js';

export const newsSwiper = new Swiper('.swiper-news', {
  modules: [Pagination, Navigation, Grid],
  direction: 'horizontal',
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 30,

  // grid: {
  //   rows: 2,
  //   fill: 'row',
  // },

  breakpoints: {
    1440: {
    }
  },

  pagination: {
    el: '.news__slider-pagination',
    bulletClass: 'news__pagination-control',
    bulletActiveClass: 'news__pagination-control--is-active',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, bulletClass) {
      return `<button class=${bulletClass}><span class="visually-hidden">Перейти к слайду ${index + 1
        }</span></button>`;
    },
    enabled: true,
  },
    navigation: {
    nextEl: '.swiper-button-news-next',
    prevEl: '.swiper-button-news-prev'
  }
});


// const unfocusNonActiveSlide = () => {
//   slidesHero[heroSwiper.activeIndex].querySelector('.hero-card__primary-button').removeAttribute('tabindex');
//   slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
// };

// const changePaginationPlace = () => {
//     slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__pagination-nebo-wrap').innerHTML = '';
//     console.log(slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__pagination-nebo-wrap'));
//     slidesHero[heroSwiper.activeIndex].querySelector('.hero-card__pagination-nebo-wrap').innerHTML = HTML_FOR_PAGINATION;
//     heroSwiper.renderBullet;
// }

// const onSliderSlideChange = () => {
//   unfocusNonActiveSlide();
//   changePaginationPlace();
// };

// heroSwiper.on('slideChange', onSliderSlideChange);
