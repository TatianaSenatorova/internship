import Swiper from 'swiper';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import {
  newsSlider,
  newsSlides,
  newsPagination
} from './dom-elements.js';
import {
  MIN_SLIDES_NUMBER_SLIDER_NEWS,
  SLIDES_PERPAGE_DESKTOP_SLIDER_NEWS,
  SLIDES_PERPAGE_TABLET_SLIDER_NEWS,
  SLIDES_PERPAGE_MOBILE_SLIDER_NEWS,
  INIT_PAGE_SLIDER_NEWS,
  SLIDES_ROWS_SLIDER_NEWS,
  SHOW_NUMBER_BULLETS,
  DESKTOP_WIDTH,
  TABLET_WIDTH
} from './constants.js';

let windowWidth = document.documentElement.clientWidth;
const initSlidesNumber = newsSlides.length;

let slidesInDom, slidesNumber, totalPages, startPage;
let currentPage = INIT_PAGE_SLIDER_NEWS;

let newsSwiper;

const initSlider = () => {
  newsSwiper = new Swiper('.swiper-news', {
    modules: [Pagination, Navigation, Grid],
    direction: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    initialSlide: 0,
    spaceBetween: 20,

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
        slidesPerView: SLIDES_PERPAGE_DESKTOP_SLIDER_NEWS,
        slidesPerGroup: 3,
      }
    },

    pagination: {
      el: '.news__slider-pagination',
      bulletClass: 'pagination-button',
      bulletActiveClass: 'pagination-button--is-active',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, bulletClass) {
        return `<li><button class=${bulletClass} data-index=${index + 1}><span class="visually-hidden">Перейти к слайду ${index + 1
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
        getTotalPages();
      },
      afterInit: function () {
        // getPaginationBullets();
      }
    }
  });
};

initSlider();
getStartPage();
updatePagination();

function getTotalPages() {
  if (windowWidth < 768) {
    totalPages = Math.ceil(slidesNumber / SLIDES_PERPAGE_MOBILE_SLIDER_NEWS);
    return;
  } else if (windowWidth <= 1440) {
    totalPages = Math.ceil(slidesNumber / SLIDES_PERPAGE_DESKTOP_SLIDER_NEWS);
    return;
  }
  totalPages = Math.ceil(slidesNumber / SLIDES_PERPAGE_TABLET_SLIDER_NEWS);
}

function getStartPage(activeIndex = 0) {
  if (windowWidth >= 1440) {
    currentPage = Math.floor(activeIndex / SLIDES_PERPAGE_DESKTOP_SLIDER_NEWS) + 1;
    startPage = Math.min(Math.max(currentPage - 2, 1), totalPages - SHOW_NUMBER_BULLETS + 1);
    return;
  } else if (windowWidth < 768) {
    currentPage = activeIndex + 1;
    startPage = Math.min(Math.max(currentPage - 2, 1), totalPages - SHOW_NUMBER_BULLETS + 1);
    return;
  }
  currentPage = Math.floor(activeIndex / SLIDES_ROWS_SLIDER_NEWS) + 1;
  startPage = Math.min(Math.max(currentPage - 2, 1), totalPages - SHOW_NUMBER_BULLETS + 1);

}

function updatePagination(activeIndex = 0) {
  getStartPage(activeIndex);
  let paginationHTML = '';
  for (let i = startPage; i < startPage + SHOW_NUMBER_BULLETS; i++) {
    const isActive = i === currentPage ? 'pagination-button--is-active' : '';
    paginationHTML += `<button class="pagination-button ${isActive}" data-index="${i - 1}"><span class="visually-hidden">Перейти к слайду ${i
    }</span>${i}</button>`;
  }
  newsPagination.innerHTML = paginationHTML;
  newsPagination.querySelectorAll('.swiper-pagination-bullet').forEach((bullet) => {
    bullet.addEventListener('click', function () {
      const index = parseInt(this.dataset.index);
      newsSwiper.slideTo(index);
    });
  });
}

updatePagination();

newsSwiper.on('slideChange', () => updatePagination(newsSwiper.activeIndex));


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
};

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
  getStartPage();
  updatePagination();
}

const onWindowResizeEvent = () => {
  checkWindowWidth();
};

function checkSlidesQuantity() {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  slidesNumber = slidesInDom.length;
  const slidesToAdd = newsSlider.innerHTML;
  while (slidesNumber < MIN_SLIDES_NUMBER_SLIDER_NEWS) {
    newsSlider.insertAdjacentHTML('beforeend', slidesToAdd);
    slidesNumber += initSlidesNumber;
  }
}

const changeImgToBackground = (slide) => {
  const cardImgWrap = slide.querySelector('.news-card__image-wrap');
  const cardImg = cardImgWrap.querySelector('.news-card__image-wrap img');
  const urlForBackground = cardImgWrap.querySelector('picture source').getAttribute('srcset');
  let url = urlForBackground.split('@')[0];
  if (windowWidth < 768) {
    url = cardImgWrap.querySelector('img').getAttribute('src').split('@')[0];
  }
  cardImgWrap.style.backgroundImage = `image-set(
      url("../../${url}@1x.webp") type("image/webp") 1x,
      url("../../${url}@2x.webp") type("image/webp") 2x,
      url("../../${url}@1x.jpg") type("image/jpeg") 1x,
      url("../../${url}@2x.jpg") type("image/jpeg") 2x
    )
`;
  cardImg.style.display = 'none';
};

const addClassToBiggerCard = () => {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  slidesInDom.forEach((slide, index) => {
    if (index === 0 || index % 3 === 0) {
      slide.classList.add('news__slider-item--bigger-on-desktop');
      changeImgToBackground(slide);
    }
  });
};

const addClassToSmallerCard = () => {
  slidesInDom = newsSlider.querySelectorAll('.news__slider-item');
  slidesInDom.forEach((slide, index) => {
    if (index % 2 !== 0) {
      slide.classList.add('news__slider-item--smaller-on-mobile');
      changeImgToBackground(slide);
    }
  });
};


const onDocumentDomContentLoaded = () => {
  checkSlidesQuantity();
  if (windowWidth >= DESKTOP_WIDTH) {
    addClassToBiggerCard();
  } else if (windowWidth < TABLET_WIDTH) {
    addClassToSmallerCard();
  }
};

newsSwiper.on('slideChange', getStartPage);

window.addEventListener('resize', onWindowResizeEvent);
document.addEventListener('DOMContentLoaded', onDocumentDomContentLoaded);
