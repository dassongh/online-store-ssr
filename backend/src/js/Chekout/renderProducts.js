(function () {
  const chekoutTotalsRef = document.querySelector('.chekout__totals');

  if (!chekoutTotalsRef) return;

  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (productCart.length > 0) {
    const { list, totalPriceMarkup } = renderProducts(productCart);
    chekoutTotalsRef.appendChild(list);
    chekoutTotalsRef.insertAdjacentHTML('beforeend', totalPriceMarkup);
  } else {
    renderParagraph(chekoutTotalsRef);
  }

  function renderProducts(products) {
    const list = document.createElement('div');
    list.classList.add('chekout__products');

    const listItemsMarkup = products
      .map(({ id, title, imageUrl, price, quantity }) => {
        return `
          <li data-id="${id}">
            <div class="chekout__info">
              <div>
                <div class="shop-cart__imgThumb">
                  <img src="${imageUrl}" />
                </div>
                <span class="chekout__quantity">${quantity}</span><span class="chekout__quantity">x</span>
                <p class="chekout__name">${title}</p>
              </div>
              <span class="chekout__price">$${(Number(quantity) * Number(price.slice(1))).toFixed(2)}</span>
            </div>
          </li>
      `;
      })
      .join('');

    list.innerHTML = listItemsMarkup;

    const totalPrice = products
      .reduce((acc, el) => (acc += Number(el.quantity) * Number(el.price.slice(1))), 0)
      .toFixed(2);
    const taxes = 3.6;

    const totalPriceMarkup = `
      <div class="chekout__subtotal">
        <div><span>Subtotal</span><span class="chekout__subtotal-price">$${totalPrice}</span></div>
        <div><span>Shipping</span><span class="chekout__subtotal-price">Calculated at next step</span></div>
        <div><span>Taxes</span><span class="chekout__subtotal-price">$${taxes}0</span></div>
      </div>
      <div class="chekout__total">
        <span>Total</span>
        <div><span class="chekout__currency">USD</span><span class="chekout__total-price">$${(
          Number(totalPrice) + Number(taxes)
        ).toFixed(2)}</span></div>
      </div>
    `;

    return { list, totalPriceMarkup };
  }
})();

export function renderParagraph(ref) {
  ref.innerHTML = '<p class="chekout__paragraph">Cart is empty</p>';
}
