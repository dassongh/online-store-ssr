import { BASE_URL } from '../other/constants';
import { addItemToCart, renderProductItem } from '../PLP/paginationPLP';

(function () {
  const refs = {
    form: document.querySelector('.search__form'),
    list: document.getElementById('searchList'),
  };

  if (!refs.form) return;

  refs.form.addEventListener('submit', e => {
    e.preventDefault();

    const query = refs.form.elements.searchQuery.value;

    if (!query) return;

    fetch(`${BASE_URL}/search`, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (!res.length > 0) return renderParagraph(refs.list);

        refs.list.innerHTML = '';
        refs.form.reset();

        res.forEach(el => refs.list.appendChild(renderProductItem(el)));
        addItemToCart();
      });
  });
})();

function renderParagraph(list) {
  list.innerHTML = '<p class="table__paragraph">Could not find anything</p>';
}
