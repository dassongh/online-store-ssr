const express = require('express');
const router = express.Router();

const productsHelper = require('../core/productsHelper');

router.get('/', async (req, res, next) => {
  const categoriesNumber = await productsHelper.calculateQuantity();
  const products = await productsHelper.getAllProducts();
  const ultraSaleProducts = await productsHelper.returnUltraSale();
  const featureProducts = await productsHelper.returnFeatureProducts();

  res.render('main', {
    categoriesNumber,
    products,
    ultraSaleProducts,
    featureProducts,
  });
});

router.get('/:category', async (req, res, next) => {
  const category = req.params.category.slice(1);

  const categoriesNumber = await productsHelper.calculateQuantity();
  const categories = await productsHelper.returnCategory(category);
  const ultraSaleProducts = await productsHelper.returnUltraSale();
  const featureProducts = await productsHelper.returnFeatureProducts();

  //res.json ruins slider
  res.render('main', {
    categoriesNumber,
    products: categories,
    ultraSaleProducts,
    featureProducts,
  });
});

module.exports = router;
