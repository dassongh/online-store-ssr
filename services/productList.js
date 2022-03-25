const express = require('express');
const router = express.Router();

const productListHelper = require('../core/productListHelper');

//homepage
router.get('/', async (req, res) => {
  const categoriesNumber = await productListHelper.calculateQuantity();
  const products = await productListHelper.getAllProducts();
  const ultraSaleProducts = await productListHelper.returnUltraSale();
  const featureProducts = await productListHelper.returnFeatureProducts();

  res.render('main', {
    homePage: true,
    categoriesNumber,
    products,
    ultraSaleProducts,
    featureProducts,
  });
});

//product list page
router.get('/products/', async (req, res) => {
  const category = req.query.category;
  const page = req.query.page;

  let sort = req.query._sort_;
  let categoryName = '';
  let productsTotal = null;
  let outputProducts = null;

  if (!sort) sort = 'default';

  if (category === 'all') {
    categoryName = productListHelper.returnCategoryName(category);
    productsTotal = await productListHelper.getAllProducts();
  } else {
    categoryName = productListHelper.returnCategoryName(category);
    productsTotal = await productListHelper.returnCategory(category);
  }

  const pageArr = productListHelper.getPages(productsTotal);

  if (page) {
    const indexToStart = (page - 1) * 15;

    productListHelper.sortBy(productsTotal, sort);
    outputProducts = [...productsTotal.slice(indexToStart, indexToStart + 15)];
  } else {
    productListHelper.sortBy(productsTotal, sort);
    outputProducts = [...productsTotal.slice(0, 15)];
  }

  const quantity = {
    total: productsTotal.length,
    returned: outputProducts.length,
  };

  res.render('PLP', {
    shopPage: true,
    categoryName,
    quantity,
    products: outputProducts,
    pageArr,
  });
});

router.post('/products/', async (req, res) => {
  const category = req.query.category;
  const page = req.query.page;

  let sort = req.query._sort_;
  let productsTotal = null;

  if (!sort) sort = 'default';

  if (category === 'all') {
    productsTotal = await productListHelper.getAllProducts();
  } else {
    productsTotal = await productListHelper.returnCategory(category);
  }

  const indexToStart = (page - 1) * 15;
  productListHelper.sortBy(productsTotal, sort);
  const products = [...productsTotal.slice(indexToStart, indexToStart + 15)];

  res.json(products);
});

//homepage
router.get('/:category', async (req, res) => {
  const category = req.params.category.slice(1);

  const categoriesNumber = await productListHelper.calculateQuantity();
  const result = await productListHelper.returnCategory(category);
  const ultraSaleProducts = await productListHelper.returnUltraSale();
  const featureProducts = await productListHelper.returnFeatureProducts();

  res.render('main', {
    homePage: true,
    categoriesNumber,
    products: result,
    ultraSaleProducts,
    featureProducts,
  });
});

module.exports = router;
