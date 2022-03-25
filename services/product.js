const express = require('express');
const router = express.Router();

const productHelper = require('../core/productHelper');
const productListHelper = require('../core/productListHelper');

router.get('/:id', async (req, res) => {
  const productId = req.params.id.slice(1);
  const product = await productHelper.getProductById(Number(productId));
  const category = product.category;
  const products = await productListHelper.returnCategory(category);

  res.render('PDP', {
    shopPage: true,
    categoryName: 'Product Details',
    product,
    products,
  });
});

module.exports = router;
