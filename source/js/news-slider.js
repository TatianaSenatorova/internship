import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import {
  newsSlider,
  newsSlides
} from './dom-elements.js';
import {
  MIN_SLIDES_NUMBER_SLIDER_NEWS
} from './constants.js';

let windowWidth = document.documentElement.clientWidth;
const initSlidesNumber = newsSlides.length;

let slidesInDom;

let newsSwiper;

const initSlider = () => {
  newsSwiper = new Swiper('.swiper-news', {
    modules: [Pagination, Navigation, Grid],
    direction: 'horizontal',
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 18,

    grid: {
      rows: 2,
      fill: 'column',
    },

    breakpoints: {

      768: {
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },

      1440: {
        grid: false,
        spaceBetween: 32,
        slidesPerView: 3,
        slidesPerGroup: 3,
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
    },

    on: {
      beforeInit: function () {
        checkSlidesQuantity();
      }
    }
  });
};

initSlider();

const initCheckWindowWidth = () => {
  if (windowWidth >= 768 && windowWidth < 1440) {
    changeSlidesPlace(newsSwiper);
  }
}

initCheckWindowWidth();

// const unfocusNonActiveSlide = () => {
//   slidesHero[heroSwiper.activeIndex].querySelector('.hero-card__primary-button').removeAttribute('tabindex');
//   slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
// };

function changeSlidesPlace() {
  const slidesNumber = newsSwiper.slides.length;
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  let countGridColumn = 2;
  for (let index = 2; index < slidesNumber; index += 4) {
    slidesInDom[index].style.gridColumn = `${countGridColumn} / ${countGridColumn + 1}`;
    slidesInDom[index + 1].style.gridColumn = `${countGridColumn - 1} / ${countGridColumn}`;
    countGridColumn += 2;
  }
}

// const gridColumnsRemove = () => {
//   console.log('remove')
//   slidesInDom.forEach(slide => {
//     slide.style.gridColumn = 'unset';
//   })
// }

const removeAddedSlides = () => {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  slidesInDom.forEach((slide, index) => {
    if (index >= initSlidesNumber) {
      slide.remove();
    }
  });
}

function checkWindowWidth() {
  const currentWindowWidth = document.documentElement.clientWidth;
  if ((currentWindowWidth < 768 && windowWidth < 768) || (currentWindowWidth >= 1440 && windowWidth >= 1440) ||
    ((currentWindowWidth >= 768 && currentWindowWidth < 1440 && windowWidth >= 768 && windowWidth < 1440))) {
    windowWidth = currentWindowWidth;
    return;
  }
  windowWidth = currentWindowWidth;
  newsSwiper.destroy(true, true);
  removeAddedSlides();
  initSlider();
  initCheckWindowWidth();
}

const onWindowResizeEvent = () => {
  checkWindowWidth();
}

function checkSlidesQuantity() {
  let slidesNumber = initSlidesNumber;
  const slidesToAdd = newsSlider.innerHTML;
  while (slidesNumber < MIN_SLIDES_NUMBER_SLIDER_NEWS) {
    newsSlider.insertAdjacentHTML('beforeend', slidesToAdd);
    slidesNumber += slidesNumber;
  }
}

window.addEventListener('resize', onWindowResizeEvent);
