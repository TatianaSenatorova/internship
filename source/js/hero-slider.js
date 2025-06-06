import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import {
  slidesHero,
  heroFalsePaginations,
  realPagination,
  slidesHeroInfoContent
} from './dom-elements.js';
import {
  PADDING_TOP_SLIDE_CONTENT
} from './constants.js';

let windowWidth = document.documentElement.clientWidth;

export const heroSwiper = new Swiper('.swiper-hero', {
  modules: [Pagination],
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
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

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target.closest('.swiper-slide-active')) {
      setRealPaginationPosition();
    }
  }
});

const observeHeight = () => {
  slidesHeroInfoContent.forEach((infoContent) => {
    resizeObserver.observe(infoContent);
  });
};

observeHeight();

const unfocusNonActiveSlide = () => {
  slidesHero[heroSwiper.activeIndex].querySelector('.hero-card__primary-button').removeAttribute('tabindex');
  slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
};

const renderFalseBullets = () => {
  const numberOfSlides = heroSwiper.slides.length;
  for (let index = 0; index < numberOfSlides; index++) {
    for (let j = 0; j < numberOfSlides; j++) {
      if (index === j) {
        heroFalsePaginations[index].insertAdjacentHTML('beforeend', `<span class="pagination-bullet pagination-bullet--is-active"></span>`);
      } else {
        heroFalsePaginations[index].insertAdjacentHTML('beforeend', `<span class="pagination-bullet"></span>`);
      }
    }
  }
}

const setRealPaginationPosition = () => {
  const top = slidesHeroInfoContent[heroSwiper.activeIndex].offsetTop;
  realPagination.style.top = `${top + PADDING_TOP_SLIDE_CONTENT}px`;
}

renderFalseBullets();
setRealPaginationPosition();

const hideRealPagination = () => {
  console.log('none')
  realPagination.style.display = 'none';
}

const onSlideChangeTransitionEnd = () => {
    console.log('show')
  realPagination.style.display = 'flex';
}

const onBeforeTransitionStart = () => {
  hideRealPagination();
  unfocusNonActiveSlide();
  setRealPaginationPosition();
}

const onWindowResize = () => {
  const currentWindowWidth = document.documentElement.clientWidth;
  if ((currentWindowWidth < 768 && windowWidth < 768) || (768 >= currentWindowWidth < 1440 && 768 >= windowWidth < 1440) || (currentWindowWidth >= 1440 && windowWidth >= 1440)) {
    windowWidth = currentWindowWidth;
    return;
  }
  hideRealPagination();
  setRealPaginationPosition();
  onSlideChangeTransitionEnd();
}

heroSwiper.on('slideChangeTransitionStart', onBeforeTransitionStart);
heroSwiper.on('slideChangeTransitionEnd', onSlideChangeTransitionEnd);
window.addEventListener('resize', onWindowResize);
