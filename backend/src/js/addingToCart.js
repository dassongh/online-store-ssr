const refs = {
  btnAdd: document.querySelectorAll('[data-add]'),
  title: document.querySelectorAll('[data-title]'),
  price: document.querySelectorAll('[data-price]'),
  image: document.querySelectorAll('[data-image]'),
};

refs.btnAdd.forEach(btn => {
  btn.addEventListener('click', () => {
    const ID = btn.dataset.add;
    const title = [...refs.title].find(el => el.dataset.title === ID).innerText;
    const price = `$${[...refs.price].find(el => el.dataset.price === ID).innerText.split('$')[1]}`;
    const image = [...refs.image].find(el => el.dataset.image === ID).currentSrc;
  });
});
