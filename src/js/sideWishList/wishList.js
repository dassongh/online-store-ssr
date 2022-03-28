const refs = {
  wishList: document.querySelector('[data-wishList]'),
  closeBtn: document.querySelector('.wish-list__btn'),
  overlay: document.querySelector('.wish-list__overlay'),
};

refs.wishList.addEventListener('click', e => {
  e.preventDefault();

  toggleWishList();
});

refs.closeBtn.addEventListener('click', () => toggleWishList());

refs.overlay.addEventListener('click', e => {
  if (e.currentTarget === e.target) toggleWishList();
});

function toggleWishList() {
  refs.overlay.classList.toggle('wish-list__overlay--is-hidden');
}
