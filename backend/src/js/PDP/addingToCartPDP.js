import { addItemToCart } from '../addingToCart';
import { countTotal } from '../addingToCart';

const refs = {
  title: document.querySelectorAll('[data-title]'),
  price: document.querySelectorAll('[data-price]'),
  image: document.querySelectorAll('[data-image]'),
  container: document.querySelector('.shop-cart__list'),
  totalPrice: document.querySelector('[data-total]'),
  button: document.querySelector('.product__info-addBtn'),
  plusButton: document.querySelector('[data-plus]'),
  minusButton: document.querySelector('[data-minus]'),
  quantity: document.querySelector('[data-quantity]'),
};

if (refs.button) {
  addItemToCart(refs.button);
  refs.button.addEventListener('click', () => {
    renderQuantity();
  });
}

if (refs.plusButton) {
  renderQuantity();

  refs.plusButton.addEventListener('click', () => {
    const productCart = JSON.parse(localStorage.getItem('productCart'));

    if (productCart.length > 0) {
      const updatedCart = productCart.map(el => {
        if (el.id === refs.plusButton.dataset.plus) {
          el.quantity += 1;
        }
        return el;
      });

      localStorage.setItem('productCart', JSON.stringify(updatedCart));

      refs.totalPrice.innerText = countTotal();

      renderQuantity();
      renderCartQuantity();
    }
  });

  refs.minusButton.addEventListener('click', () => {
    const productCart = JSON.parse(localStorage.getItem('productCart'));

    if (productCart.length > 0) {
      const updatedCart = productCart.map(el => {
        if (el.id === refs.plusButton.dataset.plus && el.quantity > 0) {
          el.quantity -= 1;
        }
        return el;
      });

      localStorage.setItem('productCart', JSON.stringify(updatedCart));

      refs.totalPrice.innerText = countTotal();

      renderQuantity();
      renderCartQuantity();
    }
  });
}

function renderQuantity() {
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (productCart.length > 0) {
    const quantity = productCart.map(el => {
      if (el.id === refs.plusButton.dataset.plus) {
        return el.quantity;
      }
    });

    refs.quantity.innerText = quantity[0];
  } else {
    refs.quantity.innerText = '0';
  }
}

function renderCartQuantity() {
  const quantityRef = document.querySelector(`[data-quantity="${refs.plusButton.dataset.plus}"]`);
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  const quantity = productCart.map(el => {
    if (el.id === refs.plusButton.dataset.plus) {
      return el.quantity;
    }
  });

  quantityRef.innerText = quantity[0];
}
