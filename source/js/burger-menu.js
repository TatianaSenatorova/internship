import {
  mainHeader,
  menuButton,
  body,
  buttonsSubMenu
} from './dom-elements';

import {
  CLASS_MENU_IS_OPENED,
  CLASS_SUB_MENU_BUTTON_ACTIVE,
  SUB_MENU_PADDING_TOP
} from './constants.js';

const onButtonSubMenuClick = (evt) => {
  evt.target.classList.toggle(CLASS_SUB_MENU_BUTTON_ACTIVE);
  const subMenu = evt.target.closest('.main-header__nav-item').querySelector('.main-header__sub-nav-list');
  if (subMenu.style.maxHeight) {
    subMenu.style.maxHeight = null;
    subMenu.style.paddingTop = null;
  } else {
    subMenu.style.paddingTop =  SUB_MENU_PADDING_TOP + 'px';
    subMenu.style.maxHeight = subMenu.scrollHeight + "px";
  }
}

const onMenuButtonClick = (evt) => {
  evt.stopPropagation();
  mainHeader.classList.toggle(CLASS_MENU_IS_OPENED);
  if (mainHeader.classList.contains(CLASS_MENU_IS_OPENED)) {
    body.addEventListener('click', onBodyClick);
    buttonsSubMenu.forEach((buttonSubMenu) => {
      buttonSubMenu.addEventListener('click', onButtonSubMenuClick)
    })
    return;
  }
  body.removeEventListener('click', onBodyClick);
};

const closeNavigation = () => {
  mainHeader.classList.remove(CLASS_MENU_IS_OPENED);
}

const onBodyClick = (evt) => {
  if ((!evt.target.closest('.main-header__nav-list')
    && !evt.target.classList.contains('main-header__primary-button'))
    || (evt.target.classList.contains('main-header__nav-link')
      && !evt.target.classList.contains('main-header__nav-link--button'))) {
    closeNavigation();
  }
};

menuButton.addEventListener('click', onMenuButtonClick);
