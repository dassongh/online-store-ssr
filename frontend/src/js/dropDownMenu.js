const refs = {
  menu: document.querySelector('[data-dropDown]'),
  link: document.querySelector('[data-link]'),
};

refs.link.addEventListener('click', e => {
  e.preventDefault();

  refs.menu.classList.toggle('drop-down--non-visible');
});

document.addEventListener(
  'click',
  e => {
    if (e.target !== refs.menu && e.target !== refs.link) {
      refs.menu.classList.add('drop-down--non-visible');
    }
  },
  true,
);
