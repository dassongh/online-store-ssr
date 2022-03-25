const refs = {
  container: document.querySelector('.shop-cart__list'),
  totalPrice: document.querySelector('.shop-cart__quantity'),
};
const template = document.getElementById('shopCartItem').content;

const productCart = JSON.parse(localStorage.getItem('productCart'));
if (productCart) renderProducts(productCart);

window.addEventListener('storage', () => {
  renderProducts(productCart);
});

function renderProducts(products) {
  products.forEach(({ id, imageUrl, title, quantity, price }) => {
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

      const updatedProducts = JSON.parse(localStorage.getItem('productCart')).filter(el => el.id !== id);

      localStorage.setItem('productCart', JSON.stringify(updatedProducts));
    });

    refs.container.appendChild(productLi);
  });
}
