const express = require('express');
const router = express.Router();

const products = require('../products/test');
const { categoriesNumber, categories, ultraSaleProducts, featureProducts } = require('../core/HPhelper');

router.get('/', (req, res, next) => {
  res.render('main', {
    categoriesNumber,
    products,
    ultraSaleProducts,
    featureProducts,
  });
});

router.get('/:category', (req, res, next) => {
  const category = req.params.category.slice(1);
  const response = categories[category];

  res.render('main', {
    categoriesNumber,
    products: response,
    ultraSaleProducts,
    featureProducts,
  });
});

module.exports = router;
