const refs = {
  title: document.querySelectorAll('[data-title]'),
  price: document.querySelectorAll('[data-price]'),
  image: document.querySelectorAll('[data-image]'),
  container: document.querySelector('.shop-cart__list'),
  totalPrice: document.querySelector('.shop-cart__quantity'),
  productsList: document.querySelector('.collection__choice-main'),
  weekDealsList: document.querySelector('.weekDeals__main-list'),
  featureList: document.querySelector('.feature-list'),
  productsListPLP: document.querySelector('.product-list__list'),
};

if (refs.productsList && refs.weekDealsList && refs.featureList) {
  addItemToCart(refs.productsList, refs.weekDealsList, refs.featureList);
} else if (refs.productsListPLP) {
  addItemToCart(refs.productsListPLP);
} else if (refs.productsList) {
  addItemToCart(refs.productsList);
}

export function addItemToCart(...productLists) {
  refs.container.innerHTML = '';

  let products = null;
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (productCart) {
    products = [...productCart];
    products.forEach(el => renderProduct(el));
  } else {
    products = [];
  }

  productLists.forEach(el => el.addEventListener('click', addToCart));

  function addToCart(e) {
    const btnAdd = e.target.dataset.add;

    if (btnAdd) {
      const title = [...refs.title].find(el => el.dataset.title === btnAdd).innerText;
      const price = `$${[...refs.price].find(el => el.dataset.price === btnAdd).innerText.split('$')[1]}`;
      const imageUrl = [...refs.image].find(el => el.dataset.image === btnAdd).currentSrc;

      const product = {
        id: btnAdd,
        title,
        price,
        imageUrl,
        quantity: 1,
      };

      const existingProductIndex = products.findIndex(el => el.id === btnAdd);

      if (existingProductIndex !== -1) {
        products[existingProductIndex].quantity += 1;
        const quantities = document.querySelectorAll('[data-quantity]');

        quantities.forEach(el => {
          if (el.dataset.quantity === btnAdd) {
            let quantity = Number(el.textContent);
            quantity += 1;
            el.textContent = quantity;
          }

          setTimeout(() => {
            refs.totalPrice.innerText = countTotal();
          }, 0);
        });
      } else {
        products.push(product);
        renderProduct(product);
      }

      localStorage.setItem('productCart', JSON.stringify(products));
    }
  }

  function renderProduct({ id, imageUrl, title, quantity, price }) {
    const productLi = document.createElement('li');
    productLi.classList.add('shop-cart__item');

    const markup = `
        <div class="shop-cart__info">
          <div class="shop-cart__imgThumb">
            <img src="${imageUrl}" />
          </div>
          <div >
            <p class="shop-cart__name">${title}</p>
          <div><span class="shop-cart__quantity" data-quantity="${id}">${quantity}</span><span class="shop-cart__quantity">x</span><span class="shop-cart__price">${price}</span></div>
          </div>
        </div>

        <button class="shop-cart__btn-delete">
          <svg
            enable-background="new 0 0 512 512"
            version="1.1"
            viewBox="0 0 512 512"
            xml:space="preserve"
            width="12px"
            height="12px"
          >
            <path
              d="m443.6 387.1-131.2-131.7 131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4s-7.2 1.5-9.8 4l-130.9 129.6-131.1-129.5c-2.6-2.6-6.1-4-9.8-4s-7.2 1.5-9.8 4l-37.3 37.6c-5.4 5.4-5.4 14.2 0 19.6l131.5 130-131.1 131.6c-2.6 2.6-4.1 6.1-4.1 9.8s1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l130.6-131.2 130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-0.1-3.6-1.6-7.1-4.2-9.7z"
            />
          </svg>
        </button>

    `;

    productLi.insertAdjacentHTML('beforeend', markup);

    const btn = productLi.querySelector('.shop-cart__btn-delete');
    btn.addEventListener('click', () => {
      productLi.remove();

      products = JSON.parse(localStorage.getItem('productCart')).filter(el => el.id !== id);

      localStorage.setItem('productCart', JSON.stringify(products));
      setTimeout(() => {
        refs.totalPrice.innerText = countTotal();
      }, 0);
    });

    refs.container.appendChild(productLi);

    setTimeout(() => {
      refs.totalPrice.innerText = countTotal();
    }, 0);
  }

  function countTotal() {
    const products = JSON.parse(localStorage.getItem('productCart'));

    const totalPrice = products.reduce((acc, el) => {
      const total = Number(el.price.slice(1)) * Number(el.quantity);
      acc += total;
      return acc;
    }, 0);

    return `$${totalPrice}`;
  }
}
