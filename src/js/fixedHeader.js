const headerRef = document.getElementById('header');
const heroRef = document.querySelector('.hero');
const commonHeadingRef = document.querySelector('.product-list__top');
const btnOpen = document.querySelector('[data-open]');
const fix = headerRef.offsetTop;

if (heroRef) {
  addOnScroll(heroRef, 'hero--header-fixed');
} else if (commonHeadingRef) {
  addOnScroll(commonHeadingRef, 'product-list__top--header-fixed');
}

function addOnScroll(section, styleClass) {
  window.onscroll = function () {
    if (window.pageYOffset > fix) {
      headerRef.classList.add('header__container-fixed');
      btnOpen.classList.add('btn-open--fixed');
      section.classList.add(styleClass);
    } else {
      headerRef.classList.remove('header__container-fixed');
      btnOpen.classList.remove('btn-open--fixed');
      section.classList.remove(styleClass);
    }
  };
}

function addOnScrollMobile(section, styleClass) {
  window.onscroll = function () {
    if (window.pageYOffset > fix) {
      section.classList.add(styleClass);
    } else {
      section.classList.remove(styleClass);
    }
  };
}
