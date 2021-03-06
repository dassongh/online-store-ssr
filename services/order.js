const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

const { check, validationResult } = require('express-validator');
const orderHelper = require('../core/orderHelper');

router.get('/cart', (req, res) => {
  res.render('Cart', {
    shopPage: true,
    categoryName: 'Shop Cart',
  });
});

router.get('/chekout', (req, res) => {
  res.render('Chekout', {
    shopPage: true,
    categoryName: 'Chekout',
  });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id.slice(1);
  const order = await orderHelper.returnOrder(id);
  const products = await orderHelper.returnOrderProducts(id);

  res.json({ order, products });
});

router.patch('/', async (req, res) => {
  const { id, status } = req.body;

  orderHelper.updateStatus(id, status);
  res.send(`Updated status order with id: ${id}`);
});

router.post(
  '/chekout',
  [
    check('email').notEmpty().isEmail().isLength({ max: 50 }),
    check('phone').notEmpty().isLength({ max: 50 }),
    check('firstName').notEmpty().isLength({ max: 50 }),
    check('lastName').notEmpty().isLength({ max: 50 }),
    check('address').notEmpty().isLength({ max: 50 }),
    check('city').notEmpty().isLength({ max: 50 }),
    check('country').notEmpty().isLength({ max: 50 }),
    check('postalCode').notEmpty().isNumeric().isLength({ max: 10 }),
    check('totalPrice').notEmpty().isLength({ max: 50 }),
    check('status').notEmpty().isLength({ max: 50 }),
    check('date').notEmpty().isLength({ max: 50 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, phone, newsletter, firstName, lastName, address, city, country, postalCode, totalPrice, status, date, productsData } =
      req.body;
    const id = nanoid();

    await orderHelper.postOrder(
      {
        email,
        phone,
        newsletter,
        firstName,
        lastName,
        address,
        city,
        country,
        postalCode,
        totalPrice,
        status,
        date,
      },
      id,
    );
    await orderHelper.postOrderProducts(productsData, id);

    res.send({ msg: `Created post with id: ${id}`, totalPrice });
  },
);

module.exports = router;
