const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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

router.post(
  '/',
  [
    check('title').notEmpty().isString().isLength({ max: 50 }),
    check('price').notEmpty().isString().isLength({ max: 50 }),
    check('category').notEmpty().isString().isLength({ max: 50 }),
    check('description').notEmpty().isString(),
    check('image_url').notEmpty().isString().isLength({ max: 500 }),
    check('raiting').notEmpty().isInt(),
    check('quantity').notEmpty().isInt(),
    check('isNew').notEmpty().isBoolean(),
    check('isUltraSale').notEmpty().isBoolean(),
    check('isFeatureProduct').notEmpty().isBoolean(),
    check('additionalDescription').notEmpty().isString(),
    check('additionalInfo').notEmpty().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = req.body;
    productHelper.postProduct(product);

    res.status(201).json({ msg: 'Product created', product });
  },
);

router.patch('/', (req, res) => {
  const { productId, key, value } = req.body;

  productHelper.updateProduct(productId, key, value);
  res.send(`Updated product with id: ${productId}`);
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  const deletedProduct = await productHelper.deleteProduct(id);

  res.json(deletedProduct);
});

module.exports = router;
