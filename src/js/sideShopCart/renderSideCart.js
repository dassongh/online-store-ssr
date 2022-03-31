import { countTotal } from './addingToCart';
import setCartIndicator from './cartIndicator';

const refs = {
  container: document.querySelector('.shop-cart__list'),
  totalPrice: document.querySelector('[data-total]'),
  tableContainer: document.querySelector('.table__container'),
  chekoutProducts: document.querySelector('.chekout__totals'),
};
const template = document.getElementById('shopCartItem').content;

if (refs.tableContainer) {
  renderSideCart();
  setCartIndicator();
} else if (refs.chekoutProducts) {
  renderSideCart();
  setCartIndicator();
}

function renderSideCart() {
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (productCart) {
    const products = [...productCart];
    products.forEach(el => renderProduct(el));
  }

  function renderProduct({ id, imageUrl, title, quantity, price }) {
    const productLi = document.createElement('li');
    productLi.classList.add('shop-cart__item');

    const cartItem = document.importNode(template, true);
    cartItem.querySelector('a').setAttribute('href', `/product/:${id}`);
    cartItem.querySelector('img').setAttribute('src', `${imageUrl}`);
    cartItem.querySelector('.shop-cart__name').textContent = `${title}`;
    cartItem.querySelector('[data-quantity]').setAttribute('data-quantity', `${id}`);
    cartItem.querySelector('[data-quantity]').textContent = `${quantity}`;
    cartItem.querySelector('.shop-cart__price').textContent = `${price}`;

    productLi.appendChild(cartItem);

    const btn = productLi.querySelector('.shop-cart__btn-delete');
    btn.addEventListener('click', () => {
      productLi.remove();

      const products = JSON.parse(localStorage.getItem('productCart')).filter(el => el.id !== id);

      localStorage.setItem('productCart', JSON.stringify(products));
      setTimeout(() => {
        refs.totalPrice.innerText = countTotal();
      }, 0);
    });

    refs.container.appendChild(productLi);

    setTimeout(() => {
      refs.totalPrice.innerText = countTotal();
    }, 0);
  }
}
