import { BASE_URL } from '../other/constants';
import { addItemToCart, renderProductItem } from '../PLP/paginationPLP';

(function () {
  const refs = {
    list: document.getElementById('wishlist'),
  };

  if (!refs.list) return;

  window.addEventListener('DOMContentLoaded', () => {
    const wishlist = JSON.parse(localStorage.getItem('wishList'));

    if (!wishlist || !wishlist.length > 0) return renderParagraph(refs.list);

    const wishlistIds = wishlist.map(el => el.id);

    fetch(`${BASE_URL}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishlistIds),
    })
      .then(res => res.json())
      .then(res => {
        res.forEach(el => refs.list.appendChild(renderProductItem(el)));

        addItemToCart();
      });
  });
})();

function renderParagraph(list) {
  list.innerHTML = '<p class="table__paragraph">Wishlist is empty</p>';
}
