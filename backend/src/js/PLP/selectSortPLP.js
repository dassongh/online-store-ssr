import { renderProduct } from './paginationPLP';

(function () {
  const refs = {
    select: document.querySelector('.product-list__select'),
    list: document.querySelector('.product-list__list'),
  };

  if (!refs.select) return;

  const BASE_URL = 'http://localhost:3000';

  refs.select.addEventListener('change', e => {
    const sort = e.target.value;

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const category = params.category;
    const page = params.page;

    fetch(`${BASE_URL}/products/?category=${category}&page=${page ? page : '1'}&_sort_=${sort}`)
      .then(res => res.json())
      .then(res => {
        console.log(page);
        const params = new URLSearchParams(window.location.search);
        params.set('_sort_', sort);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

        const markup = res.map(el => renderProduct(el)).join('');

        refs.list.innerHTML = markup;
      });
  });
})();
