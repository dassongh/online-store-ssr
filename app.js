const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/svg');

hbs.registerHelper('isFiveStar', value => value === 5);
hbs.registerHelper('isFourStar', value => value === 4);
hbs.registerHelper('isThreeStar', value => value === 3);
hbs.registerHelper('isSaleAndNew', (oldPrice, isNew) => oldPrice && isNew);

const products = require('./services/productList');
const product = require('./services/product');
const order = require('./services/order');
const contact = require('./services/contact');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('dist'));
app.use('/products/', express.static('dist'));
app.use('/product/', express.static('dist'));
app.use('/order/', express.static('dist'));
app.use('/contact/', express.static('dist'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', products);
app.use('/product/', product);
app.use('/order/', order);
app.use('/contact/', contact);

app.listen(port, () => {
  console.log('Server started.......');
});
