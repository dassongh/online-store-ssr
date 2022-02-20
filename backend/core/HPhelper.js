const data = require('../products/test');

const calculateQuantity = category => {
  return data.reduce((acc, el) => {
    if (el.category === category) acc += 1;
    return acc;
  }, 0);
};

const categories = {
  fruits: calculateQuantity('fruits'),
  vegetables: calculateQuantity('vegetables'),
  meats: calculateQuantity('meats'),
  grainAndNuts: calculateQuantity('grain & nuts'),
  smoothies: calculateQuantity('smoothies'),
};

module.exports = categories;

// fruits, vegetables, meats, grain & nuts, smoothies
