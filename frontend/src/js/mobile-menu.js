const refs = {
  openBtn: document.querySelector('[data-open]'),
  closeBtn: document.querySelector('[data-close]'),
  menuIsClosed: document.querySelector('.header__container'),
  menuIsOpen: document.querySelectorAll('[data-menu]'),
};

refs.openBtn.addEventListener('click', () => {
  refs.menuIsOpen.forEach(el => {
    el.classList.remove('header__container-mobile');
    el.classList.remove('not-visible');
  });

  refs.menuIsClosed.classList.add('header__container-closed');
});

refs.closeBtn.addEventListener('click', () => {
  refs.menuIsOpen.forEach(el => {
    el.classList.add('header__container-mobile');
    setTimeout(() => el.classList.add('not-visible'), 250);
  });

  refs.menuIsClosed.classList.remove('header__container-closed');
});
