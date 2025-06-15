import {
  mainHeader,
  menuButton,
  body,
  buttonsSubMenu,
  navSubLists,
  navList,
  mainHeaderSublinks
} from './dom-elements';
import {
  isEscapeKey
} from './utils.js';

import {
  CLASS_MENU_IS_OPENED,
  CLASS_SUB_MENU_BUTTON_ACTIVE,
  SUB_MENU_PADDING_TOP
} from './constants.js';

const subLists = {};

const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

const changeTabindexSubLinks = (subLinks, isToAdd = true) => {
  subLinks.forEach((subLink) => {
    if (isToAdd) {
      subLink.setAttribute('tabindex', '-1');
    } else {
      subLink.removeAttribute('tabindex', '-1');
    }
  });
};

const closeNavigation = () => {
  mainHeader.classList.remove(CLASS_MENU_IS_OPENED);
  navSubLists.forEach((list) => {
    list.style.maxHeight = null;
    list.style.paddingTop = null;
  });
  buttonsSubMenu.forEach((button) => {
    button.classList.remove(CLASS_SUB_MENU_BUTTON_ACTIVE);
  });
  changeTabindexSubLinks(mainHeaderSublinks);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNavigation();
  }
};

const getSubLinks = () => {
  buttonsSubMenu.forEach((button) => {
    const subListName = button.getAttribute('data-button');
    const subListItems = navList.querySelector(`[data-submenu=${subListName}]`).querySelectorAll('.main-header__nav-link--sub-link');
    subLists[subListName] = subListItems;
  });
};
getSubLinks();

const onButtonSubMenuClick = (evt) => {
  evt.target.classList.toggle(CLASS_SUB_MENU_BUTTON_ACTIVE);
  const subMenu = evt.target.closest('.main-header__nav-item').querySelector('.main-header__sub-nav-list');
  const openedSubLinks = subMenu.querySelectorAll('.main-header__nav-link--sub-link');
  if (subMenu.style.maxHeight) {
    subMenu.style.maxHeight = null;
    subMenu.style.paddingTop = null;
    changeTabindexSubLinks(openedSubLinks);
    return;
  }
  subMenu.style.paddingTop = `${SUB_MENU_PADDING_TOP}px`;
  subMenu.style.maxHeight = `${subMenu.scrollHeight}px`;
  changeTabindexSubLinks(openedSubLinks, false);
};

const onBodyClick = (evt) => {
  if ((!evt.target.closest('.main-header__nav-list')
    && !evt.target.classList.contains('main-header__primary-button'))
    || (evt.target.classList.contains('main-header__nav-link')
      && !evt.target.classList.contains('main-header__nav-link--button'))) {
    closeNavigation();
  }
};

const onMenuButtonClick = (evt) => {
  evt.stopPropagation();
  mainHeader.classList.toggle(CLASS_MENU_IS_OPENED);
  if (mainHeader.classList.contains(CLASS_MENU_IS_OPENED)) {
    body.style.paddingRight = `${scrollWidth}px`;
    body.addEventListener('click', onBodyClick);
    buttonsSubMenu.forEach((buttonSubMenu) => {
      buttonSubMenu.addEventListener('click', onButtonSubMenuClick);
    });

    document.addEventListener('keydown', onDocumentKeydown);
    return;
  }
  body.style.paddingRight = '0px';
  closeNavigation();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
};

menuButton.addEventListener('click', onMenuButtonClick);
