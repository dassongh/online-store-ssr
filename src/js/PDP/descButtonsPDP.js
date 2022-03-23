(function () {
  const buttonRefs = document.querySelectorAll('.product__info-optionBtn');
  const textRefs = document.querySelectorAll('.product__info-descText');

  if (!buttonRefs) return;

  buttonRefs.forEach(btn => {
    btn.addEventListener('click', e => {
      buttonRefs.forEach(el => el.classList.remove('product__info-optionBtn--active'));

      const dataValue = e.target.dataset.info;
      btn.classList.add('product__info-optionBtn--active');

      textRefs.forEach(el => {
        el.classList.add('product__info-descText--hidden');
        if (el.dataset.info === dataValue) el.classList.remove('product__info-descText--hidden');
      });
    });
  });
})();
