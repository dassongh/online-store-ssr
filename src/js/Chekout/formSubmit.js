import { renderParagraph } from './renderProducts';
import { BASE_URL } from '../other/constants';

(function () {
  const formRef = document.querySelector('.form');
  const chekoutTotalsRef = document.querySelector('.chekout__totals');
  const shopCartListRef = document.querySelector('.shop-cart__list');
  const cartIndicatorRef = document.querySelector('.cart-indicator');

  if (!formRef) return;

  formRef.addEventListener('submit', e => {
    e.preventDefault();

    const productCart = JSON.parse(localStorage.getItem('productCart'));
    const totalPrice = document.querySelector('.chekout__total-price');

    if (!productCart || !productCart.length > 0) return;

    const productsData = productCart.map(({ id, quantity }) => ({
      productId: Number(id),
      quantity: Number(quantity),
    }));

    const date = new Date().toLocaleString();

    const formData = {
      email: formRef.elements.email.value,
      phone: formRef.elements.phone.value,
      newsletter: formRef.elements.newsletter.checked,
      firstName: formRef.elements.FirstName.value,
      lastName: formRef.elements.LastName.value,
      address: formRef.elements.address.value,
      city: formRef.elements.city.value,
      country: formRef.elements.country.value,
      postalCode: Number(formRef.elements.postalCode.value),
      totalPrice: totalPrice.innerText,
      status: 'unhandled',
      date,
      productsData,
    };

    fetch(`${BASE_URL}/order/chekout`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        formRef.reset();
        localStorage.removeItem('productCart');
        renderParagraph(chekoutTotalsRef, 'Thank you for your order!');
        shopCartListRef.innerHTML = '';
        cartIndicatorRef.classList.add('cart-indicator--hidden');
        console.log('Success', res);
      })
      .catch(err => alert('Error with submiting form: ', err));
  });
})();
