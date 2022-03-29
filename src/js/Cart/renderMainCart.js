(function () {
  const tableContainerRef = document.querySelector('.table__container');
  const totalPriceRef = document.querySelector('.table__total-price');

  if (!tableContainerRef) return;

  const templateTableHead = document.getElementById('tableHead').content;
  const templateTableRow = document.getElementById('tableRow').content;
  const productCart = JSON.parse(localStorage.getItem('productCart'));

  if (!productCart) return renderParagraph();

  if (productCart.length > 0) {
    tableContainerRef.prepend(renderTable(productCart));
    addClickHanlders();
    const itemsTotalPrice = tableContainerRef.querySelectorAll('[data-totalprice]');
    countTotal(itemsTotalPrice);
  } else {
    renderParagraph();
  }

  function renderParagraph() {
    tableContainerRef.innerHTML = '<p class="table__paragraph">Cart is empty</p>';
  }

  function renderTable(products) {
    const table = document.createElement('table');
    table.classList.add('table');

    const tableHead = document.importNode(templateTableHead, true);
    table.appendChild(tableHead);

    const tableBody = document.createElement('tbody');

    products.forEach(({ id, title, imageUrl, price, quantity }) => {
      const tableRow = document.importNode(templateTableRow, true);
      tableRow.querySelector('tr').setAttribute('data-id', `${id}`);
      tableRow.querySelector('a').setAttribute('href', `/product/:${id}`);
      tableRow.querySelector('img').setAttribute('src', `${imageUrl}`);
      tableRow.querySelector('img').setAttribute('alt', `${title}`);
      tableRow.querySelector('img').setAttribute('data-image', `${id}`);
      tableRow.querySelector('.table__title').textContent = `${title}`;
      tableRow.querySelector('.table__price').textContent = `${price}`;
      tableRow.querySelector('[data-minus]').setAttribute('data-minus', `${id}`);
      tableRow.querySelector('[data-quantity]').setAttribute('data-quantity', `${id}`);
      tableRow.querySelector('[data-quantity]').textContent = `${quantity}`;
      tableRow.querySelector('[data-plus]').setAttribute('data-plus', `${id}`);
      tableRow.querySelector('[data-totalprice]').setAttribute('data-totalprice', `${id}`);
      tableRow.querySelector('[data-totalprice]').textContent = `$${(Number(price.slice(1)) * Number(quantity)).toFixed(2)}`;
      tableRow.querySelector('[data-delete]').setAttribute('data-delete', `${id}`);

      tableBody.appendChild(tableRow);
    });

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
                item.innerText = `$${(Number(el.price.slice(1)) * Number(el.quantity)).toFixed(2)}`;
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

        countTotal(refs.totalPrice);

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
                item.innerText = `$${(Number(el.price.slice(1)) * Number(el.quantity)).toFixed(2)}`;
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

        countTotal(refs.totalPrice);

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

        const totalsPrice = tableContainerRef.querySelectorAll('[data-totalprice]');
        countTotal(totalsPrice);
      });
    });
  }

  function countTotal(totals) {
    const totalPrice = [...totals].reduce((acc, el) => {
      return (acc += Number(el.innerText.slice(1)));
    }, 0);

    totalPriceRef.innerText = `$${totalPrice.toFixed(2)}`;
  }
})();
