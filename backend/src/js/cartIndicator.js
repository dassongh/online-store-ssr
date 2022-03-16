export default function setCartIndicator() {
  const indicatorRef = document.querySelector('.cart-indicator');
  const indicatorNumber = document.querySelector('[data-indicator]');
  const listRef = document.querySelector('.shop-cart__list');

  if (listRef.childElementCount > 0) {
    indicatorRef.classList.remove('cart-indicator--hidden');
    indicatorNumber.innerText = listRef.childElementCount;
  } else {
    indicatorRef.classList.add('cart-indicator--hidden');
  }
}
