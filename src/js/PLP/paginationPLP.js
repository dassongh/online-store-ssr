import { BASE_URL } from '../other/constants';
import { countTotal } from '../sideShopCart/addingToCart';
import { renderListProductItem } from './changeViewPLP';
import setCartIndicator from '../sideShopCart/cartIndicator';
import setWishListIndicator from '../sideWishList/wishListIndicator';

(function () {
  const refs = {
    list: document.querySelector('.product-list__list'),
    pages: document.querySelectorAll('[data-page]'),
    pageOne: document.querySelector('[data-page]'),
    container: document.querySelector('.shop-cart__list'),
  };

  if (!refs.pageOne) return;

  refs.pageOne.classList.add('pagination--active');

  refs.pages.forEach(el => {
    el.addEventListener('click', () => {
      refs.pages.forEach(el => el.classList.remove('pagination--active'));
      const page = el.dataset.page;
      el.classList.add('pagination--active');

      const params = new URLSearchParams(window.location.search);
      const sort = params.get('_sort_');
      const category = params.get('category');

      fetch(`${BASE_URL}/products/?category=${category}&page=${page}&_sort_=${sort !== 'default' ? sort : 'default'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          params.set('page', page);
          window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

          let view = params.get('view');
          if (!view) view = 'card';

          refs.list.innerHTML = '';

          if (view === 'card') res.forEach(el => refs.list.appendChild(renderProductItem(el)));
          if (view === 'list') res.forEach(el => refs.list.appendChild(renderListProductItem(el)));

          addItemToCart();
          addItemToWishList();
        });
    });
  });
})();

export function renderProductItem({ image_url, old_price, isNew, id, raiting, title, price }) {
  const template = document.getElementById('product').content;
  const productItem = document.importNode(template, true);

  productItem.querySelector('.product-list__item').setAttribute('data-id', `${id}`);
  productItem.querySelector('img').setAttribute('src', `${image_url}`);
  productItem.querySelector('img').setAttribute('alt', `${title}`);
  productItem.querySelector('img').setAttribute('data-image', `${id}`);

  const discountMarkup = `${
    old_price && isNew
      ? `<div class="thumb__discount thumb__discount--both"><span class="thumb__discount-number">-20%</span></div>
          <div class="thumb__discount thumb__discount--both-new"><span class="thumb__discount-number">new</span></div> `
      : isNew
      ? `<div class="thumb__discount thumb__discount--sale"><span class="thumb__discount-number">new</span></div>`
      : old_price
      ? `<div class="thumb__discount"><span class="thumb__discount-number">-20%</span></div>`
      : ''
  }`;
  productItem.querySelector('img').insertAdjacentHTML('afterend', discountMarkup);

  productItem.querySelector('[data-like]').setAttribute('data-like', `${id}`);
  productItem.querySelector('[data-add]').setAttribute('data-add', `${id}`);
  productItem.querySelector('a').setAttribute('href', `/product/:${id}`);

  const raitingMarkup = `
    ${
      raiting === 3
        ? `<div class="clip-star clip-star--empty"></div>
        <div class="clip-star clip-star--empty"></div>`
        : raiting === 4
        ? `<div class="clip-star"></div>
        <div class="clip-star clip-star--empty"></div>`
        : raiting === 5
        ? `<div class="clip-star"></div>
        <div class="clip-star"></div>`
        : ''
    }
  `;
  productItem.querySelector('.raiting').insertAdjacentHTML('beforeend', raitingMarkup);

  productItem.querySelector('[data-title]').setAttribute('data-title', `${id}`);
  productItem.querySelector('[data-title]').textContent = `${title}`;
  productItem.querySelector('[data-price]').setAttribute('data-price', `${id}`);
  productItem.querySelector('[data-price]').textContent = `${price}`;

  const priceMarkup = `${old_price ? `<span class="card-item__price card-item__old-price">${old_price}</span>` : ''}`;
  productItem.querySelector('[data-price]').insertAdjacentHTML('beforeend', priceMarkup);

  return productItem;
}

export function addItemToCart() {
  const addToCartRefs = {
    title: document.querySelectorAll('[data-title]'),
    price: document.querySelectorAll('[data-price]'),
    image: document.querySelectorAll('[data-image]'),
    container: document.querySelector('.shop-cart__list'),
    totalPrice: document.querySelector('[data-total]'),
  };
  const template = document.getElementById('shopCartItem').content;

  addToCartRefs.container.innerHTML = '';

  let products = null;
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (productCart) {
    products = [...productCart];
    products.forEach(el => renderProduct(el));
  } else {
    products = [];
  }

  const addBtnRefs = document.querySelectorAll('[data-add]');
  addBtnRefs.forEach(btn => {
    btn.addEventListener('click', () => {
      const btnAdd = btn.dataset.add;

      if (btnAdd) {
        const title = [...addToCartRefs.title].find(el => el.dataset.title === btnAdd).innerText;
        const price = `$${[...addToCartRefs.price].find(el => el.dataset.price === btnAdd).innerText.split('$')[1]}`;
        const imageUrl = [...addToCartRefs.image].find(el => el.dataset.image === btnAdd).currentSrc;

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
              addToCartRefs.totalPrice.innerText = countTotal();
            }, 0);
          });
        } else {
          products.push(product);
          renderProduct(product);
        }

        localStorage.setItem('productCart', JSON.stringify(products));
        setCartIndicator();
      }
    });
  });

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
        addToCartRefs.totalPrice.innerText = countTotal();
      }, 0);

      setCartIndicator();
    });

    addToCartRefs.container.appendChild(productLi);

    setTimeout(() => {
      addToCartRefs.totalPrice.innerText = countTotal();
    }, 0);
  }
}

export function addItemToWishList() {
  const addToWishListRefs = {
    title: document.querySelectorAll('[data-title]'),
    price: document.querySelectorAll('[data-price]'),
    image: document.querySelectorAll('[data-image]'),
    container: document.getElementById('wishListContainer'),
  };
  const template = document.getElementById('wishListItem').content;

  addToWishListRefs.container.innerHTML = '';

  let products = null;
  const wishList = JSON.parse(localStorage.getItem('wishList'));

  if (wishList) {
    products = [...wishList];
    products.forEach(el => renderProduct(el));
  } else {
    products = [];
  }

  const addToWishListBtnRefs = document.querySelectorAll('[data-like]');
  addToWishListBtnRefs.forEach(btn => {
    btn.addEventListener('click', () => {
      const btnAdd = btn.dataset.like;

      if (btnAdd) {
        const title = [...addToWishListRefs.title].find(el => el.dataset.title === btnAdd).innerText;
        const price = `$${[...addToWishListRefs.price].find(el => el.dataset.price === btnAdd).innerText.split('$')[1]}`;
        const imageUrl = [...addToWishListRefs.image].find(el => el.dataset.image === btnAdd).currentSrc;

        const product = {
          id: btnAdd,
          title,
          price,
          imageUrl,
        };

        const existingProductIndex = products.findIndex(el => el.id === btnAdd);

        if (existingProductIndex !== -1) {
          products = products.filter(product => product.id !== btnAdd);

          const elementRefs = document.querySelectorAll('[data-element]');

          elementRefs.forEach(el => {
            if (el.dataset.element === btnAdd) el.remove();
          });
        } else {
          products.push(product);
          renderProduct(product);
        }

        localStorage.setItem('wishList', JSON.stringify(products));
        setWishListIndicator();
      }
    });
  });

  function renderProduct({ id, imageUrl, title, price }) {
    const productLi = document.createElement('li');
    productLi.setAttribute('data-element', `${id}`);
    productLi.classList.add('shop-cart__item');

    const wishListItem = document.importNode(template, true);
    wishListItem.querySelector('a').setAttribute('href', `/product/:${id}`);
    wishListItem.querySelector('img').setAttribute('src', `${imageUrl}`);
    wishListItem.querySelector('.shop-cart__name').textContent = `${title}`;
    wishListItem.querySelector('.shop-cart__price').textContent = `${price}`;

    productLi.appendChild(wishListItem);

    const btn = productLi.querySelector('.shop-cart__btn-delete');
    btn.addEventListener('click', () => {
      productLi.remove();
      products = JSON.parse(localStorage.getItem('wishList')).filter(el => el.id !== id);
      localStorage.setItem('wishList', JSON.stringify(products));
      setWishListIndicator();
    });

    addToWishListRefs.container.appendChild(productLi);
  }
}
