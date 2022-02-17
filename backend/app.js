const path = require('path');

const express = require('express');
const app = express();
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/home', (req, res, next) => {
  res.render('main', {
    product: 'Vegetables',
    price: '$12.0',
    quantity: '2',
  });
});

app.listen(3030);
