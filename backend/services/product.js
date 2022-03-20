const express = require('express');
const router = express.Router();

const { getProductById } = require('../core/productHelper');
const { returnCategory } = require('../core/productsHelper');

router.get('/:id', async (req, res, next) => {
  const productId = req.params.id.slice(1);
  const product = await getProductById(Number(productId));
  const category = product.category;
  const products = await returnCategory(category);

  res.render('PDP', {
    shopPage: true,
    categoryName: 'Product Details',
    product,
    products,
  });
});

// router.post('/:id', (req, res, next) => {
//   const data = req.body;

//   res.json(data);
// });

module.exports = router;
