import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import {
  slidesHero,
  heroFalsePaginations,
  realPagination,
  heroWrapsPagination
} from './dom-elements.js';
import {
  DESKTOP_WIDTH,
  TABLET_WIDTH
} from './constants.js';

let windowWidth = document.documentElement.clientWidth;
let heroSwiper;
let prevIndex;

const initSlider = () => {
  heroSwiper = new Swiper('.swiper-hero', {
    modules: [Pagination],
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    initialSlide: 0,

    breakpoints: {
      768: {
      },
      1440: {
        allowTouchMove: false,
      }
    },

    pagination: {
      el: '.hero__slider-pagination',
      bulletClass: 'pagination-bullet',
      bulletActiveClass: 'pagination-bullet--is-active',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, bulletClass) {
        return `<button class=${bulletClass}><span class="visually-hidden">Перейти к слайду ${index + 1
          }</span></button>`;
      },
      enabled: true,
    },

    on: {
      slideChange: function (heroSwiper) {
        onSlideChange(heroSwiper);
      }
    }
  });
}

initSlider();

function unfocusNonActiveSlide(heroSwiper) {
  slidesHero[heroSwiper.realIndex].querySelector('.hero-card__primary-button').removeAttribute('tabindex');
  if (prevIndex) {
    slidesHero[prevIndex].querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
  }
  prevIndex = heroSwiper.realIndex;
};

const renderFalseBullets = () => {
  const numberOfSlides = heroSwiper.slides.length;
  for (let index = 0; index < numberOfSlides; index++) {
    for (let j = 0; j < numberOfSlides; j++) {
      if (index === j) {
        heroFalsePaginations[index].insertAdjacentHTML('beforeend', '<span class="pagination-bullet pagination-bullet--is-active"></span>');
      } else {
        heroFalsePaginations[index].insertAdjacentHTML('beforeend', '<span class="pagination-bullet"></span>');
      }
    }
  }
};

function renderRealPagination(currentSlide = 0) {
  heroWrapsPagination[currentSlide].insertAdjacentElement('beforeend', realPagination)
};

renderFalseBullets();
renderRealPagination();

function onSlideChange(heroSwiper) {
  const activeSlide = heroSwiper.realIndex;
  unfocusNonActiveSlide(heroSwiper);
  renderRealPagination(activeSlide);
};

const onWindowResize = () => {
  const currentWindowWidth = document.documentElement.clientWidth;
  if ((currentWindowWidth < TABLET_WIDTH && windowWidth < TABLET_WIDTH) || (currentWindowWidth >= DESKTOP_WIDTH && windowWidth >= DESKTOP_WIDTH) ||
    ((currentWindowWidth >= TABLET_WIDTH && currentWindowWidth < DESKTOP_WIDTH && windowWidth >= TABLET_WIDTH && windowWidth < DESKTOP_WIDTH))) {
    windowWidth = currentWindowWidth;
    return;
  }
  windowWidth = document.documentElement.clientWidth;
  prevIndex = null;
  heroSwiper.destroy(true, true);
  initSlider();
  renderRealPagination();
};

window.addEventListener('resize', onWindowResize);
