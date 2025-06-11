import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import {
  newsSlider
} from './dom-elements.js';
import {
  // HTML_FOR_PAGINATION
} from './constants.js';

let windowWidth = document.documentElement.clientWidth;

export const newsSwiper = new Swiper('.swiper-news', {
  modules: [Pagination, Navigation, Grid],
  direction: 'horizontal',
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 18,
  //  autoHeight: true,
  // slidesPerColumn: 2,
  // autoHeight: false,

  grid: {
    rows: 2,
    fill: 'column',
  },

  breakpoints: {
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
      slidesPerGroup: 4,
      grid: {
        // rows: 2,
        // fill: 'row',
        // snapGrid: 2,
      },

    },
    1440: {
      slidesPerView: 3,
    }
  },

  pagination: {
    el: '.news__slider-pagination',
    bulletClass: 'pagination-button',
    bulletActiveClass: 'pagination-button--is-active',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4,
    renderBullet: function (index, bulletClass) {
      return `<button class=${bulletClass}><span class="visually-hidden">Перейти к слайду ${index + 1
        }</span>${index + 1}</button>`;
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

// newsSwiper.on('slideChange', onSliderSlideChange);

const changeSlidesPlace = () => {
  const slidesNumber = newsSwiper.slides.length;
  const slidesDom = newsSlider.querySelectorAll('.news__slider-item');
  let numberGridColumn = 2;
  console.log(slidesNumber)
  for (let index = 2; index < slidesNumber; index += 4) {
    slidesDom[index].style.gridColumn = `${numberGridColumn} / ${numberGridColumn + 1}`;
    slidesDom[index + 1].style.gridColumn = `${numberGridColumn - 1} / ${numberGridColumn}`;
    numberGridColumn += 2;
  }
}

checkWindowWidth();


function checkWindowWidth() {
  if (document.documentElement.clientWidth < 1440 && document.documentElement.clientWidth >= 768) {
    changeSlidesPlace();
  }
}

const onWindowResizeEvent = () => {
  checkWindowWidth();
}

window.addEventListener('resize', onWindowResizeEvent);
