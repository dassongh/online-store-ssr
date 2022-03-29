(function () {
  const chekoutTotalsRef = document.querySelector('.chekout__totals');

  if (!chekoutTotalsRef) return;

  const template = document.getElementById('chekoutProduct').content;
  const templateTotal = document.getElementById('chekoutTotal').content;
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (!productCart) {
    renderParagraph(chekoutTotalsRef, 'Cart is empty');
  } else if (productCart.length > 0) {
    const { list, totalPriceElement } = renderProducts(productCart);
    chekoutTotalsRef.appendChild(list);
    chekoutTotalsRef.appendChild(totalPriceElement);
  } else {
    renderParagraph(chekoutTotalsRef, 'Cart is empty');
  }

  function renderProducts(products) {
    const list = document.createElement('div');
    list.classList.add('chekout__products');

    products.forEach(({ id, title, imageUrl, price, quantity }) => {
      const listItem = document.importNode(template, true);

      listItem.querySelector('li').setAttribute('data-id', `${id}`);
      listItem.querySelector('a').setAttribute('href', `/product/:${id}`);
      listItem.querySelector('img').setAttribute('src', `${imageUrl}`);
      listItem.querySelector('.chekout__quantity').textContent = `${quantity}`;
      listItem.querySelector('.chekout__name').textContent = `${title}`;
      listItem.querySelector('.chekout__price').textContent = `$${(Number(quantity) * Number(price.slice(1))).toFixed(2)}`;

      list.appendChild(listItem);
    });

    const totalPrice = products.reduce((acc, el) => (acc += Number(el.quantity) * Number(el.price.slice(1))), 0).toFixed(2);
    const taxes = 3.6;

    const totalPriceElement = document.importNode(templateTotal, true);

    totalPriceElement.getElementById('subtotalPrice').textContent = `$${totalPrice}`;
    totalPriceElement.getElementById('taxes').textContent = `$${taxes}`;
    totalPriceElement.getElementById('totalPrice').textContent = `$${(Number(totalPrice) + Number(taxes)).toFixed(2)}`;

    return { list, totalPriceElement };
  }
})();

export function renderParagraph(ref, value) {
  ref.innerHTML = `<p class="chekout__paragraph">${value}</p>`;
}
