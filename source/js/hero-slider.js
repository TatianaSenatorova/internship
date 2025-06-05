import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import {
  slidesHero,
  sliderHero,
  heroFalsePaginations,
  realPagination,
  slidesHeroInfoContent,
  heroPagination
} from './dom-elements.js';
import {
  PADDING_TOP_SLIDE_CONTENT
} from './constants.js';

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


// const setPaginationPosition = () => {
//   console.log('123');
// }

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target.closest('.swiper-slide-active')) {
      console.log(entry.borderBoxSize[0].blockSize);
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

// const changeRealPaginationPosition = () => {
//     slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__pagination-nebo-wrap').innerHTML = '';
//     console.log(slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__pagination-nebo-wrap'));
//     slidesHero[heroSwiper.activeIndex].querySelector('.hero-card__pagination-nebo-wrap').innerHTML = HTML_FOR_PAGINATION;
//     heroSwiper.renderBullet;
// }

const onSliderSlideChange = () => {
  unfocusNonActiveSlide();
  observeHeight();
};


const renderFalseBullets = () => {
  const numberOfSlides = heroSwiper.slides.length;
  for (let index = 0; index < numberOfSlides; index++) {
    for (let j = 0; j < numberOfSlides; j++) {
      if (index === j) {
        heroFalsePaginations[index].insertAdjacentHTML('beforeend', `<button class="pagination-bullet pagination-bullet--is-active"></button>`);
      } else {
        heroFalsePaginations[index].insertAdjacentHTML('beforeend', `<button class="pagination-bullet"></button>`);
      }
    }
  }
}

const setRealPaginationPosition = () => {
  const top = slidesHeroInfoContent[heroSwiper.activeIndex].offsetTop;
  realPagination.style.top = `${top + PADDING_TOP_SLIDE_CONTENT}px`;
  console.log(top, slidesHeroInfoContent[heroSwiper.activeIndex]);
}

renderFalseBullets();
setRealPaginationPosition();

const hideRealPagination = () => {
  realPagination.style.display = 'none';
}

const showRealPagination = () => {
  setRealPaginationPosition();
  realPagination.style.display = 'flex';
}

heroSwiper.on('slideChange', hideRealPagination);
heroSwiper.on('transitionEnd', showRealPagination);
