import { addItemToCart } from '../addingToCart';

const refs = {
  title: document.querySelectorAll('[data-title]'),
  price: document.querySelectorAll('[data-price]'),
  image: document.querySelectorAll('[data-image]'),
  container: document.querySelector('.shop-cart__list'),
  totalPrice: document.querySelector('.shop-cart__quantity'),
  button: document.querySelector('.product__info-addBtn'),
  plusButton: document.querySelector('[data-plus]'),
  minusButton: document.querySelector('[data-minus]'),
  quantity: document.querySelectorAll('[data-quantity]'),
};

if (refs.button) addItemToCart(refs.button);

const productCart = JSON.parse(localStorage.getItem('productCart'));

if (refs.plusButton) {
  refs.plusButton.addEventListener('click', e => {
    if (productCart) {
      const updatedCart = productCart.map(el => {
        if (el.id === refs.plusButton.dataset.plus) {
          el.quantity += 1;
        }
        return el;
      });
      console.log(updatedCart);
    }
  });
}
