import { addItemToWishList } from '../sideWishList/addingToWishList';

const refs = {
  title: document.querySelectorAll('[data-title]'),
  price: document.querySelectorAll('[data-price]'),
  image: document.querySelectorAll('[data-image]'),
  button: document.querySelector('[data-like]'),
};

if (refs.button) {
  addItemToWishList(refs.button);
}
