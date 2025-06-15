import {
  inputPhone,
  inputName
} from './dom-elements.js';

export const CLASS_MENU_IS_OPENED = 'main-header--nav-is-opened';
export const CLASS_SUB_MENU_BUTTON_ACTIVE = 'main-header__nav-button--is-active';
export const SUB_MENU_PADDING_TOP = 7;
export const HTML_FOR_PAGINATION = '<div class="hero__slider-pagination swiper-pagination"></div>';
export const MIN_SLIDES_NUMBER_DESKTOP_PROGRAMS = 8;
export const MIN_SLIDES_NUMBER_TABLET_PROGRAMS = 4;
export const MIN_SLIDES_NUMBER_SLIDER_NEWS = 24;
export const SLIDES_PERPAGE_DESKTOP_SLIDER_NEWS = 3;
export const SLIDES_PERPAGE_TABLET_SLIDER_NEWS = 4;
export const SLIDES_PERPAGE_MOBILE_SLIDER_NEWS = 2;
export const SLIDES_ROWS_SLIDER_NEWS = 2;
export const INIT_PAGE_SLIDER_NEWS = 1;
export const DESKTOP_WIDTH = 1440;
export const TABLET_WIDTH = 768;
export const MOBILE_WIDTH = 320;
export const SHOW_NUMBER_BULLETS = 4;
export const DataForValidation = [
  {
    DOM_INPUT: inputName,
    REG_EXP: /^[A-Za-zА-Яа-яЁё\-]+(?: [A-Za-zА-Яа-яЁё\-]+)*$/,
    VALID: true,
    ERROR: 'Заполните это поле. Не вводите цифры и спецсимволы.'
  },
  {
    DOM_INPUT: inputPhone,
    REG_EXP: /^(?=(?:.*\d){10,})[0-9()+\-\s]+$/,
    VALID: true,
    ERROR: 'Заполните это поле. Не вводите буквы. Можно символы +, -, ( , ) и 10 цифр'
  },
];

