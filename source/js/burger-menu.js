import {
  mainHeader,
  menuButton,
  navList,
  body
} from './dom-elements';

const onMenuButtonClick = (evt) => {
  evt.stopPropagation();
  mainHeader.classList.toggle('main-header--nav-is-opened');
  if (mainHeader.classList.contains('main-header--nav-is-opened')) {
    body.addEventListener('click', onBodyClick);
    return;
  }
  body.removeEventListener('click', onBodyClick);
};

const closeNavigation = () => {
  mainHeader.classList.remove('main-header--nav-is-opened');
}

const onBodyClick = (evt) => {
  if ((!evt.target.closest('.main-header__nav-list')
    && !evt.target.classList.contains('main-header__primary-button'))
    || (evt.target.classList.contains('main-header__nav-link')
      && !evt.target.classList.contains('main-header__nav-link--with-arrow'))) {
    closeNavigation();
  }
};

menuButton.addEventListener('click', onMenuButtonClick);
// navList.addEventListener('click', onNavListClick);
