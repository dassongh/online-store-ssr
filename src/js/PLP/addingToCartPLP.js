import { addItemToCart, addItemToWishList } from './paginationPLP';
import setCartIndicator from '../sideShopCart/cartIndicator';
import setWishListIndicator from '../sideWishList/wishListIndicator';

(function () {
  const listRef = document.querySelector('.product-list__list');

  if (!listRef) return;

  addItemToCart();
  addItemToWishList();
  setCartIndicator();
  setWishListIndicator();
})();
