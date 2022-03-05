const path = require('path');
const express = require('express');
const app = express();

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('isFiveStar', value => value === 5);
hbs.registerHelper('isFourStar', value => value === 4);
hbs.registerHelper('isThreeStar', value => value === 3);
hbs.registerHelper('isSaleAndNew', (oldPrice, isNew) => oldPrice && isNew);

const products = require('./services/products');
const product = require('./services/product');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('dist'));
app.use('/products/', express.static('dist'));
app.use('/product/', express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', products);
app.use('/product/', product);

app.listen(3000);
