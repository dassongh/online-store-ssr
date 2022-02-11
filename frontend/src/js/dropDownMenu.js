const refs = {
  menu: document.querySelector('[data-dropDown]'),
  link: document.querySelector('[data-link]'),
};

refs.link.addEventListener('click', e => {
  e.preventDefault();

  refs.menu.classList.toggle('drop-down--non-visible');
});
