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

export const newsSwiper = new Swiper('.swiper-news', {
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
      slidesPerGroup: 4,
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
    afterInit: function (newsSwiper) {
      checkSlidesNumber(newsSwiper);
    }
  }
});


// const unfocusNonActiveSlide = () => {
//   slidesHero[heroSwiper.activeIndex].querySelector('.hero-card__primary-button').removeAttribute('tabindex');
//   slidesHero[heroSwiper.previousIndex].querySelector('.hero-card__primary-button').setAttribute('tabindex', '-1');
// };

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
  console.log(document.documentElement.clientWidth );
  if (document.documentElement.clientWidth < 1440 && document.documentElement.clientWidth >= 768) {
    changeSlidesPlace();
  }
}

const onWindowResizeEvent = () => {
  checkWindowWidth();
}

function checkSlidesNumber(newsSwiper) {
  let slidesNumber = newsSwiper.slides.length;
  const slidesToAdd = newsSlider.innerHTML;
  while (slidesNumber < MIN_SLIDES_NUMBER_SLIDER_NEWS) {
    newsSlider.insertAdjacentHTML('beforeend', slidesToAdd);
    slidesNumber += slidesNumber;
  }
}


const updateSlider = () => {
  console.log('123')
  newsSwiper.updateProgress();
  newsSwiper.updateSize();
  newsSwiper.updateSlides();
  newsSwiper.update();
}

newsSwiper.on('resize', updateSlider);
window.addEventListener('resize', onWindowResizeEvent);
