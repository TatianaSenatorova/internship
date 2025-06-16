import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import {
  slidesHero,
  heroFalsePaginations,
  realPagination,
  heroWrapsPagination
} from './dom-elements.js';

let heroSwiper;

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
  });

};

initSlider();

function unfocusNonActiveSlide(initIndex = 0) {
  slidesHero.forEach((slide) => {
    slide.querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
  });
  slidesHero[initIndex].querySelector('.hero-card__primary-button').removeAttribute('tabindex');
}

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
  heroWrapsPagination[currentSlide].insertAdjacentElement('beforeend', realPagination);
}

renderFalseBullets();
renderRealPagination();

function onSlideChange() {
  const activeSlide = heroSwiper.realIndex;
  unfocusNonActiveSlide(activeSlide);
  renderRealPagination(activeSlide);
}

export const onResizeUpdateHeroSlider = () => {
  heroSwiper.destroy(true, true);
  const initIndex = 0;
  renderRealPagination(initIndex);
  unfocusNonActiveSlide(initIndex);
  initSlider();
};

heroSwiper.on('slideChange', onSlideChange);
