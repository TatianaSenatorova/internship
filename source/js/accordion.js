import {
  accordion,
  activeAccordions
} from './dom-elements.js';

let windowWidth;

const updateAccordionsHeight = () => {
  activeAccordions.forEach((accordion) => {
    const contentElement = accordion.querySelector('.accordion__wrapper-content');
    const openHeight = contentElement.scrollHeight;
    contentElement.style.maxHeight = `${openHeight}px`;
  });
};

const setInitialSizes = () => {
  windowWidth = window.innerWidth;
  updateAccordionsHeight();
};

setInitialSizes();

const closeAccordion = (accordionElement) => {
  const contentAccordion = accordionElement.querySelector('.accordion__wrapper-content');
  if (!contentAccordion) {
    return;
  }
  accordionElement.classList.remove('accordion__element--is-active');
  contentAccordion.style.maxHeight = '0';
};

const openAccordion = (accordionElement) => {
  const contentElement = accordionElement.querySelector('.accordion__wrapper-content');
  const openHeight = contentElement.scrollHeight;
  accordionElement.classList.add('accordion__element--is-active');
  contentElement.style.maxHeight = `${openHeight}px`;
};

const onAccordionClick = (evt) => {
  evt.preventDefault();
  if (!evt.target.closest('.accordion__button')) {
    return;
  }
  const accordionClicked = evt.target.closest('.accordion__element');
  if (accordionClicked.classList.contains('accordion__element--is-active')) {
    closeAccordion(accordionClicked);
    return;
  }
  openAccordion(accordionClicked);
};

const onWindowResize = () => {
  if (windowWidth === window.innerWidth) {
    return;
  }
  windowWidth = window.innerWidth;
  updateAccordionsHeight();
};

accordion.addEventListener('click', onAccordionClick);
window.addEventListener('resize', onWindowResize);
