const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

const { postOrder, postOrderProducts } = require('../core/orderHelper');

router.get('/cart', (req, res, next) => {
  res.render('Cart', {
    shopPage: true,
    categoryName: 'Shop Cart',
  });
});

router.get('/chekout', (req, res, next) => {
  res.render('Chekout', {
    shopPage: true,
    categoryName: 'Chekout',
  });
});

router.post('/chekout', async (req, res, next) => {
  const { orderData, productsData } = req.body;
  const id = nanoid();

  const order = await postOrder(orderData, id);
  const products = await postOrderProducts(productsData, id);

  res.json({
    order,
    products,
    id,
  });
});

module.exports = router;
