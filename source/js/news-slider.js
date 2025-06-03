import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import {
//   slidesHero,
//   slidesHeroInfoContent,
//   heroPagination
} from './dom-elements.js';
import {
// HTML_FOR_PAGINATION
} from './constants.js';

export const newsSwiper = new Swiper('.swiper-news', {
  modules: [Pagination],
  direction: 'horizontal',
  slidesPerView: 1,
  initialSlide: 0,

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
      return `<button class=${bulletClass}><span class="visually-hidden">Перейти к странице ${index + 1
        }</span></button>`;
    },
    enabled: true,
  },
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
