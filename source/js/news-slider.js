import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import {
  newsSlider,
  newsSlides,
  newsPagination
} from './dom-elements.js';
import {
  MIN_SLIDES_NUMBER_SLIDER_NEWS,
  SLIDES_PERVIEW_DESKTOP_SLIDER_NEWS,
  DESKTOP_WIDTH,
  TABLET_WIDTH
} from './constants.js';

let windowWidth = document.documentElement.clientWidth;
const initSlidesNumber = newsSlides.length;

let slidesInDom;

let newsSwiper;

let bullets;

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
        slidesPerView: SLIDES_PERVIEW_DESKTOP_SLIDER_NEWS,
        slidesPerGroup: 3,
      }
    },

    pagination: {
      el: '.news__slider-pagination',
      bulletClass: 'pagination-item',
      bulletActiveClass: 'pagination-item--is-active',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      renderBullet: function (index, bulletClass) {
        return `<li class=${bulletClass} data-page=${index + 1}><button class="pagination-button"><span class="visually-hidden">Перейти к слайду ${index + 1
          }</span>${index + 1}</button></li>`;
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
      },
      afterInit: function () {
        getPaginationBullets();
      }
    }
  });
};

initSlider();

function getPaginationBullets() {
  bullets = newsPagination.querySelectorAll('.pagination-item');
}

// const unfocusNonActiveSlide = () => {
//   slidesHero[heroSwiper.activeIndex].querySelector('.hero-card__primary-button').removeAttribute('tabindex');
//   slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
// };

const removeAddedSlidesAndClasses = () => {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  slidesInDom.forEach((slide, index) => {
    if (index >= initSlidesNumber) {
      slide.remove();
    } else if (slide.classList.contains('news__slider-item--bigger-on-desktop') || slide.classList.contains('news__slider-item--smaller-on-mobile')) {
      slide.classList.remove('news__slider-item--bigger-on-desktop');
      slide.classList.remove('news__slider-item--smaller-on-mobile');
      const cardImgWrap = slide.querySelector('.news-card__image-wrap');
      const cardImg = slide.querySelector('.news-card__image-wrap img');
      cardImgWrap.style.backgroundImage = 'unset';
      cardImg.style.display = 'block';
    }
  });
}

function checkWindowWidth() {
  const currentWindowWidth = document.documentElement.clientWidth;
  if ((currentWindowWidth < TABLET_WIDTH && windowWidth < TABLET_WIDTH) || (currentWindowWidth >= DESKTOP_WIDTH && windowWidth >= DESKTOP_WIDTH) ||
    ((currentWindowWidth >= TABLET_WIDTH && currentWindowWidth < DESKTOP_WIDTH && windowWidth >= TABLET_WIDTH && windowWidth < DESKTOP_WIDTH))) {
    windowWidth = currentWindowWidth;
    return;
  }
  windowWidth = currentWindowWidth;
  newsSwiper.destroy(true, true);
  removeAddedSlidesAndClasses();
  checkSlidesQuantity();
  if (windowWidth >= DESKTOP_WIDTH) {
    addClassToBiggerCard();
  } else if (windowWidth < TABLET_WIDTH) {
    addClassToSmallerCard();
  }
  initSlider();
}

const onWindowResizeEvent = () => {
  checkWindowWidth();
}

function checkSlidesQuantity() {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  let slidesNumber = slidesInDom.length;
  const slidesToAdd = newsSlider.innerHTML;
  while (slidesNumber < MIN_SLIDES_NUMBER_SLIDER_NEWS) {
    newsSlider.insertAdjacentHTML('beforeend', slidesToAdd);
    slidesNumber += initSlidesNumber;
  }
}

const changeImgToBackground = (slide) => {
  const cardImgWrap = slide.querySelector('.news-card__image-wrap');
  const cardImg = slide.querySelector('.news-card__image-wrap img');
  const urlForBackground = cardImg.getAttribute('src');
  cardImgWrap.style.backgroundImage = `url('../../${urlForBackground}')`;
  cardImg.style.display = 'none';
}

const addClassToBiggerCard = () => {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  slidesInDom.forEach((slide, index) => {
    if (index === 0 || index % 3 === 0) {
      slide.classList.add('news__slider-item--bigger-on-desktop');
      changeImgToBackground(slide);
    }
  })
}

const addClassToSmallerCard = () => {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  slidesInDom.forEach((slide, index) => {
    if (index % 2 !== 0) {
      slide.classList.add('news__slider-item--smaller-on-mobile');
      changeImgToBackground(slide);
    }
  })
}


const onDocumentDomContentLoaded = () => {
  checkSlidesQuantity();
  if (windowWidth >= DESKTOP_WIDTH) {
    addClassToBiggerCard();
  } else if (windowWidth < TABLET_WIDTH) {
    addClassToSmallerCard();
  }
}

const onNewsSwiperSlideChange = () => {
  const currentBullet = newsPagination.querySelector('.pagination-item--is-active');
  const currentBulletWidth = currentBullet.offsetWidth;
  const xDistanceToParent = currentBullet.getBoundingClientRect();
  const xNewsPagination = newsPagination.getBoundingClientRect();
  console.log(xDistanceToParent, xNewsPagination)
}

newsSwiper.on('slideChange', onNewsSwiperSlideChange);

window.addEventListener('resize', onWindowResizeEvent);
document.addEventListener("DOMContentLoaded", onDocumentDomContentLoaded);
