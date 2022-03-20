import { renderProduct } from './paginationPLP';
import { BASE_URL } from '../constants';
import { addItemToCart } from '../addingToCart';

(function () {
  const refs = {
    select: document.querySelector('.product-list__select'),
    list: document.querySelector('.product-list__list'),
  };

  if (!refs.select) return;

  refs.select.addEventListener('change', e => {
    const sort = e.target.value;

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const category = params.category;
    const page = params.page;

    fetch(`${BASE_URL}/products/?category=${category}&page=${page ? page : '1'}&_sort_=${sort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(page);
        const params = new URLSearchParams(window.location.search);
        params.set('_sort_', sort);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

        const markup = res.map(el => renderProduct(el)).join('');

        refs.list.innerHTML = markup;
        const addToCartRefs = {
          title: document.querySelectorAll('[data-title]'),
          price: document.querySelectorAll('[data-price]'),
          image: document.querySelectorAll('[data-image]'),
          container: document.querySelector('.shop-cart__list'),
          totalPrice: document.querySelector('[data-total]'),
        };
        addItemToCart(addToCartRefs, refs.list);
      });
  });
})();
