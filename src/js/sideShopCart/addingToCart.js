import setCartIndicator from './cartIndicator';

const refs = {
  title: document.querySelectorAll('[data-title]'),
  price: document.querySelectorAll('[data-price]'),
  image: document.querySelectorAll('[data-image]'),
  container: document.querySelector('.shop-cart__list'),
  totalPrice: document.querySelector('[data-total]'),
  productsList: document.querySelector('.collection__choice-main'),
  weekDealsList: document.querySelector('.weekDeals__main-list'),
  featureList: document.querySelector('.feature-list'),
  contactPage: document.querySelector('.contact'),
};
const template = document.getElementById('shopCartItem').content;

if (refs.productsList && refs.weekDealsList && refs.featureList) {
  addItemToCart(refs.productsList, refs.weekDealsList, refs.featureList);
  setCartIndicator();
} else if (refs.productsList) {
  addItemToCart(refs.productsList);
  setCartIndicator();
} else if (refs.contactPage) {
  addItemToCart(refs.contactPage);
  setCartIndicator();
}

export function addItemToCart(...productLists) {
  refs.container.innerHTML = '';

  let products = null;
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (productCart) {
    products = [...productCart];
    products.forEach(el => renderProduct(el));
  } else {
    products = [];
  }

  productLists.forEach(el => el.addEventListener('click', addToCart));

  function addToCart(e) {
    const btnAdd = e.target.dataset.add;

    if (btnAdd) {
      const title = [...refs.title].find(el => el.dataset.title === btnAdd).innerText;
      const price = `$${[...refs.price].find(el => el.dataset.price === btnAdd).innerText.split('$')[1]}`;
      const imageUrl = [...refs.image].find(el => el.dataset.image === btnAdd).currentSrc;

      const product = {
        id: btnAdd,
        title,
        price,
        imageUrl,
        quantity: 1,
      };

      const existingProductIndex = products.findIndex(el => el.id === btnAdd);

      if (existingProductIndex !== -1) {
        products[existingProductIndex].quantity += 1;
        const quantities = document.querySelectorAll('[data-quantity]');

        quantities.forEach(el => {
          if (el.dataset.quantity === btnAdd) {
            let quantity = Number(el.textContent);
            quantity += 1;
            el.textContent = quantity;
          }

          setTimeout(() => {
            refs.totalPrice.innerText = countTotal();
          }, 0);
        });
      } else {
        products.push(product);
        renderProduct(product);
      }

      localStorage.setItem('productCart', JSON.stringify(products));
      setCartIndicator();
    }
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

      products = JSON.parse(localStorage.getItem('productCart')).filter(el => el.id !== id);

      localStorage.setItem('productCart', JSON.stringify(products));
      setTimeout(() => {
        refs.totalPrice.innerText = countTotal();
      }, 0);

      setCartIndicator();
    });

    refs.container.appendChild(productLi);

    setTimeout(() => {
      refs.totalPrice.innerText = countTotal();
    }, 0);
  }
}

export function countTotal() {
  const products = JSON.parse(localStorage.getItem('productCart'));

  if (products) {
    const totalPrice = products.reduce((acc, el) => {
      const total = Number(el.price.slice(1)) * Number(el.quantity);
      acc += total;
      return acc;
    }, 0);

    return `$${totalPrice.toFixed(2)}`;
  }
}
