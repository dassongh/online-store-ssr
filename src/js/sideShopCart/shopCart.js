const refs = {
  shopCart: document.querySelector('[data-shopCart]'),
  closeBtn: document.querySelector('.shop-cart__btn'),
  overlay: document.querySelector('.shop-cart__overlay'),
};

refs.shopCart.addEventListener('click', e => {
  e.preventDefault();

  toggleShopCart();
});

refs.closeBtn.addEventListener('click', () => toggleShopCart());

refs.overlay.addEventListener('click', e => {
  if (e.currentTarget === e.target) toggleShopCart();
});

function toggleShopCart() {
  refs.overlay.classList.toggle('shop-cart__overlay--is-hidden');
}
