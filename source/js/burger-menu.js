import {
  mainHeader,
  menuButton,
  navList,
  body,
  buttonsSubMenu,
  subMenus
} from './dom-elements';

import {
  menuOpenedClass,
  subMenuButtonActiveClass
} from './constants.js';

const onButtonSubMenuClick = (evt) => {
  evt.target.classList.toggle(subMenuButtonActiveClass);
  const subMenu = evt.target.closest('.main-header__nav-item').querySelector('.main-header__sub-nav-list');
  if (subMenu.style.maxHeight) {
    subMenu.style.maxHeight = null;
  } else {
    subMenu.style.maxHeight = subMenu.scrollHeight + "px";
  }
}

const onMenuButtonClick = (evt) => {
  evt.stopPropagation();
  mainHeader.classList.toggle(menuOpenedClass);
  if (mainHeader.classList.contains(menuOpenedClass)) {
    body.addEventListener('click', onBodyClick);
    buttonsSubMenu.forEach((buttonSubMenu) => {
      buttonSubMenu.addEventListener('click', onButtonSubMenuClick)
    })
    return;
  }
  body.removeEventListener('click', onBodyClick);
};

const closeNavigation = () => {
  mainHeader.classList.remove(menuOpenedClass);
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
