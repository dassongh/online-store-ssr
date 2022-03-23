import { BASE_URL } from '../constants';
import { renderProductItem } from './paginationPLP';
import { addItemToCart } from './paginationPLP';

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
        const params = new URLSearchParams(window.location.search);
        params.set('_sort_', sort);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

        const markup = res.map(el => renderProductItem(el)).join('');
        refs.list.innerHTML = markup;

        addItemToCart();
      });
  });
})();
