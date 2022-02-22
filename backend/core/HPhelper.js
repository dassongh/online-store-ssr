const data = require('../products/test');

const calculateQuantity = category => {
  return data.reduce((acc, el) => {
    if (el.category === category) acc += 1;
    return acc;
  }, 0);
};

const returnCategory = category => {
  return data.filter(el => el.category === category);
};

const returnUltraSale = () => data.filter(el => el.isUltraSale);

const returnFeatureProducts = () => data.filter(el => el.isFeatureProduct);

const categoriesNumber = {
  fruits: calculateQuantity('fruits'),
  vegetables: calculateQuantity('vegetables'),
  meats: calculateQuantity('meats'),
  grainAndNuts: calculateQuantity('grainAndNuts'),
  smoothies: calculateQuantity('smoothies'),
};

const categories = {
  fruits: returnCategory('fruits'),
  vegetables: returnCategory('vegetables'),
  meats: returnCategory('meats'),
  grainAndNuts: returnCategory('grainAndNuts'),
  smoothies: returnCategory('smoothies'),
};

const ultraSaleProducts = returnUltraSale();
const featureProducts = returnFeatureProducts();

module.exports = {
  data,
  categoriesNumber,
  categories,
  ultraSaleProducts,
  featureProducts,
};

// fruits, vegetables, meats, grain & nuts, smoothies
