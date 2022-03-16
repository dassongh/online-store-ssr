const headerRef = document.getElementById('header');
const heroRef = document.querySelector('.hero');
const commonHeadingRef = document.querySelector('.product-list__top');
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
      section.classList.add(styleClass);
    } else {
      headerRef.classList.remove('header__container-fixed');
      section.classList.remove(styleClass);
    }
  };
}
