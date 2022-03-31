import setWishListIndicator from './wishListIndicator';

const refs = {
  title: document.querySelectorAll('[data-title]'),
  price: document.querySelectorAll('[data-price]'),
  image: document.querySelectorAll('[data-image]'),
  container: document.getElementById('wishListContainer'),
  productsList: document.querySelector('.collection__choice-main'),
  weekDealsList: document.querySelector('.weekDeals__main-list'),
  featureList: document.querySelector('.feature-list'),
  productsListPLP: document.querySelector('.product-list__list'),
  contactPage: document.querySelector('.contact'),
  tableContainer: document.querySelector('.table__container'),
  chekoutProducts: document.querySelector('.chekout__totals'),
};
const template = document.getElementById('wishListItem').content;

if (refs.productsList && refs.weekDealsList && refs.featureList) {
  addItemToWishList(refs.productsList, refs.weekDealsList, refs.featureList);
  setWishListIndicator();
} else if (refs.productsListPLP) {
  addItemToWishList(refs.productsListPLP);
  setWishListIndicator();
} else if (refs.productsList) {
  addItemToWishList(refs.productsList);
  setWishListIndicator();
} else if (refs.contactPage) {
  addItemToWishList(refs.contactPage);
  setWishListIndicator();
} else if (refs.tableContainer) {
  addItemToWishList(refs.tableContainer);
  setWishListIndicator();
} else if (refs.chekoutProducts) {
  addItemToWishList(refs.chekoutProducts);
  setWishListIndicator();
}

export function addItemToWishList(...productLists) {
  refs.container.innerHTML = '';

  let products = null;
  const wishList = JSON.parse(localStorage.getItem('wishList'));

  if (wishList) {
    products = [...wishList];
    products.forEach(el => renderProduct(el));
  } else {
    products = [];
  }

  productLists.forEach(el => el.addEventListener('click', addToWishList));

  function addToWishList(e) {
    const btnAdd = e.target.dataset.like;

    if (btnAdd) {
      const title = [...refs.title].find(el => el.dataset.title === btnAdd).innerText;
      const price = `$${[...refs.price].find(el => el.dataset.price === btnAdd).innerText.split('$')[1]}`;
      const imageUrl = [...refs.image].find(el => el.dataset.image === btnAdd).currentSrc;

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
  }

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

    refs.container.appendChild(productLi);
  }
}
