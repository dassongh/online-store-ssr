const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');

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

router.post('/chekout', (req, res, next) => {
  const orderInfo = req.body;

  console.log(orderInfo);
});

module.exports = router;
