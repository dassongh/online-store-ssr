const express = require('express');
const router = express.Router();

const categories = require('../core/HPhelper');
const products = require('../products/test');

router.get('/', (req, res, next) => {
  res.render('main', {
    categories,
    products,
  });
});

router.get('/:category', (req, res, next) => {
  res.json(products);
});

module.exports = router;
