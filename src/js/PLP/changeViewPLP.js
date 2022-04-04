import { BASE_URL } from '../other/constants';
import { addItemToCart, addItemToWishList } from './paginationPLP';
import { renderProductItem } from './paginationPLP';

(function () {
  const refs = {
    cardViewBtn: document.querySelector('[data-card]'),
    listViewBtn: document.querySelector('[data-list]'),
    list: document.querySelector('.product-list__list'),
  };

  if (!refs.cardViewBtn) return;

  refs.listViewBtn.addEventListener('click', () => {
    refs.cardViewBtn.classList.remove('product-list__btn--active');
    refs.listViewBtn.classList.add('product-list__btn--active');

    const view = 'list';

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const category = params.category;
    const page = params.page;
    const sort = params._sort_;

    fetch(`${BASE_URL}/products/?category=${category}&page=${page ? page : '1'}&_sort_=${sort !== 'default' ? sort : 'default'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        const params = new URLSearchParams(window.location.search);
        params.set('view', view);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

        refs.list.innerHTML = '';
        refs.list.classList.add('product-list__list--listView');

        res.forEach(el => refs.list.appendChild(renderListProductItem(el)));

        addItemToCart();
        addItemToWishList();
      });
  });

  refs.cardViewBtn.addEventListener('click', () => {
    refs.listViewBtn.classList.remove('product-list__btn--active');
    refs.cardViewBtn.classList.add('product-list__btn--active');

    const view = 'card';

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const category = params.category;
    const page = params.page;
    const sort = params._sort_;

    fetch(`${BASE_URL}/products/?category=${category}&page=${page ? page : '1'}&_sort_=${sort !== 'default' ? sort : 'default'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        const params = new URLSearchParams(window.location.search);
        params.set('view', view);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

        refs.list.innerHTML = '';
        refs.list.classList.remove('product-list__list--listView');

        res.forEach(el => refs.list.appendChild(renderProductItem(el)));

        addItemToCart();
        addItemToWishList();
      });
  });
})();

export function renderListProductItem({ image_url, old_price, isNew, id, raiting, title, price }) {
  const template = document.getElementById('listProduct').content;
  const productItem = document.importNode(template, true);

  productItem.querySelector('.product-list__item').setAttribute('data-id', `${id}`);
  productItem.querySelector('img').setAttribute('src', `${image_url}`);
  productItem.querySelector('img').setAttribute('alt', `${title}`);
  productItem.querySelector('img').setAttribute('data-image', `${id}`);

  const discountMarkup = `${
    old_price && isNew
      ? `<div class="thumb__discount thumb__discount--both thumb__discount--both--list"><span class="thumb__discount-number">-20%</span></div>
          <div class="thumb__discount thumb__discount--both-new thumb__discount--both-new--list"><span class="thumb__discount-number">new</span></div> `
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
