const express = require('express');
const router = express.Router();

router.get('/cart', (req, res, next) => {
  res.render('Cart', {
    shopPage: true,
    categoryName: 'Shop Cart',
  });
});

module.exports = router;
