const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  calculateQuantity,
  returnCategory,
  returnUltraSale,
  returnFeatureProducts,
  sortBy,
} = require('../core/productsHelper');

//homepage
router.get('/', async (req, res, next) => {
  const categoriesNumber = await calculateQuantity();
  const products = await getAllProducts();
  const ultraSaleProducts = await returnUltraSale();
  const featureProducts = await returnFeatureProducts();

  res.render('main', {
    homePage: true,
    categoriesNumber,
    products,
    ultraSaleProducts,
    featureProducts,
  });
});

//product list page
router.get('/products/', async (req, res, next) => {
  const category = req.query.category;

  let categoryName = '';
  let productsTotal = null;

  if (category === 'all') {
    categoryName = 'All products';
    productsTotal = await getAllProducts();
  } else {
    switch (category) {
      case 'meats':
        categoryName = 'Fresh meats';
        break;
      case 'fruits':
        categoryName = 'Fresh fruits';
        break;
      case 'vegetables':
        categoryName = 'Fresh vegetables';
        break;
      case 'grainAndNuts':
        categoryName = 'Grain & Nuts';
        break;
      case 'smoothies':
        categoryName = 'Smoothies';
        break;
    }

    productsTotal = await returnCategory(category);
  }

  const page = req.query.page;
  const pages = Math.ceil(productsTotal.length / 15);
  const pageArr = [];
  for (let i = 1; i <= pages; i++) {
    pageArr.push(i);
  }

  let sort = req.query._sort_;
  if (!sort) sort = 'default';

  if (page) {
    const indexToStart = (page - 1) * 15;
    sortBy(productsTotal, sort);
    const products = [...productsTotal.slice(indexToStart, indexToStart + 15)];

    res.json(products);
  } else {
    sortBy(productsTotal, sort);
    const products = [...productsTotal.slice(0, 15)];

    const quantity = {
      total: productsTotal.length,
      returned: products.length,
    };

    res.render('PLP', {
      shopPage: true,
      categoryName,
      quantity,
      products,
      pageArr,
    });
  }
});

//homepage
router.get('/:category', async (req, res, next) => {
  const category = req.params.category.slice(1);

  const categoriesNumber = await calculateQuantity();
  const result = await returnCategory(category);
  const ultraSaleProducts = await returnUltraSale();
  const featureProducts = await returnFeatureProducts();

  res.render('main', {
    homePage: true,
    categoriesNumber,
    products: result,
    ultraSaleProducts,
    featureProducts,
  });
});

module.exports = router;
