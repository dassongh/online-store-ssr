import { BASE_URL } from '../other/constants';
import { renderProductItem } from './paginationPLP';
import { renderListProductItem } from './changeViewPLP';
import { addItemToCart, addItemToWishList } from './paginationPLP';

(function () {
  const refs = {
    select: document.querySelector('.product-list__select'),
    list: document.querySelector('.product-list__list'),
  };

  if (!refs.select) return;

  refs.select.addEventListener('change', e => {
    const sort = e.target.value;

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const page = params.get('page');

    fetch(`${BASE_URL}/products/?category=${category}&page=${page ? page : '1'}&_sort_=${sort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        params.set('_sort_', sort);
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
})();
