(function () {
  const tableContainerRef = document.querySelector('.table__container');

  if (!tableContainerRef) return;

  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (productCart.length > 0) {
    tableContainerRef.prepend(renderTable(productCart));
    addClickHanlders();
  } else {
    renderParagraph();
  }

  function renderParagraph() {
    tableContainerRef.innerHTML = '<p class="table__paragraph">Cart is empty</p>';
  }

  function renderTable(products) {
    const table = document.createElement('table');
    table.classList.add('table');
    const tableHead = `<thead>
                         <tr>
                           <th>Product name</th>
                           <th>Price</th>
                           <th>Quantity</th>
                           <th>Total</th>
                         </tr>
                       </thead>`;
    table.innerHTML = tableHead;

    const tableBody = document.createElement('tbody');

    const tableRows = products
      .map(({ id, title, imageUrl, price, quantity }) => {
        return `
              <tr data-id="${id}">
                <td>
                  <div class="table__img">
                    <img
                      src="${imageUrl}"
                      alt="${title}"
                      data-image="${id}"
                    />
                  </div>
                  <div class="table__desc">
                    <p class="table__title">${title}</p>
                  </div>
                </td>
                <td>
                  <span class="table__price">${price}</span>
                </td>
                <td>
                  <div class="product__info-quantity table__quantity">
                    <button class="product__info-quantityBtn" data-minus="${id}">
                      <svg viewBox="0 0 24 24" width="18px" height="18px">
                        <g data-name="Layer 2">
                          <g data-name="arrow-left">
                            <rect width="24" height="24" opacity="0" />
                            <path
                              d="M13.54 18a2.06 2.06 0 0 1-1.3-.46l-5.1-4.21a1.7 1.7 0 0 1 0-2.66l5.1-4.21a2.1 2.1 0 0 1 2.21-.26 1.76 1.76 0 0 1 1.05 1.59v8.42a1.76 1.76 0 0 1-1.05 1.59 2.23 2.23 0 0 1-.91.2z"
                            />
                          </g>
                        </g>
                      </svg>
                    </button>
                    <span class="product__info-quantityText" data-quantity="${id}">${quantity}</span>
                    <button class="product__info-quantityBtn" data-plus="${id}">
                      <svg viewBox="0 0 24 24" width="18px" height="18px">
                        <g data-name="Layer 2">
                          <g data-name="arrow-right">
                            <rect transform="rotate(180 12 12)" width="24" height="24" opacity="0" />
                            <path
                              d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46z"
                            />
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                </td>
                <td>
                  <div>
                    <span class="table__price" data-totalprice="${id}">$${(
          Number(price.slice(1)) * Number(quantity)
        ).toFixed(2)}</span>
                    <button class="shop-cart__btn-delete" data-delete=${id}>
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
                  </div>
                </td>
              </tr>
      `;
      })
      .join('');

    tableBody.innerHTML = tableRows;
    table.appendChild(tableBody);

    return table;
  }

  function addClickHanlders() {
    const refs = {
      rows: tableContainerRef.querySelectorAll('[data-id]'),
      plusBtns: tableContainerRef.querySelectorAll('[data-plus]'),
      minusBtns: tableContainerRef.querySelectorAll('[data-minus]'),
      totalPrice: tableContainerRef.querySelectorAll('[data-totalprice]'),
      quantity: tableContainerRef.querySelectorAll('[data-quantity]'),
      deleteBtn: tableContainerRef.querySelectorAll('[data-delete]'),
    };

    const productCart = JSON.parse(localStorage.getItem('productCart'));

    refs.plusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const updatedCart = productCart.map(el => {
          if (el.id == btn.dataset.plus) {
            el.quantity += 1;

            refs.totalPrice.forEach(item => {
              if (item.dataset.totalprice === el.id) {
                item.innerText = `$${Number(el.price.slice(1)) * Number(el.quantity).toFixed(2)}`;
              }
            });

            refs.quantity.forEach(item => {
              if (item.dataset.quantity === el.id) {
                item.innerText = el.quantity;
              }
            });
          }
          return el;
        });

        localStorage.setItem('productCart', JSON.stringify(updatedCart));
      });
    });

    refs.minusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const updatedCart = productCart.map(el => {
          if (el.id == btn.dataset.minus && el.quantity > 0) {
            el.quantity -= 1;

            refs.totalPrice.forEach(item => {
              if (item.dataset.totalprice === el.id) {
                item.innerText = `$${Number(el.price.slice(1)) * Number(el.quantity).toFixed(2)}`;
              }
            });

            refs.quantity.forEach(item => {
              if (item.dataset.quantity === el.id) {
                item.innerText = el.quantity;
              }
            });
          }
          return el;
        });

        localStorage.setItem('productCart', JSON.stringify(updatedCart));
      });
    });

    refs.deleteBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        const updatedCart = JSON.parse(localStorage.getItem('productCart')).filter(el => el.id !== btn.dataset.delete);

        refs.rows.forEach(el => {
          if (el.dataset.id === btn.dataset.delete) el.remove();
        });

        localStorage.setItem('productCart', JSON.stringify(updatedCart));
      });
    });
  }
})();
