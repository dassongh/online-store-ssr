const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async () => await prisma.products.findMany();

const calculateQuantity = async () => {
  const data = await prisma.products.findMany();

  let categoriesNumber = {};

  for (const product of data) {
    category = product.category;

    if (categoriesNumber.hasOwnProperty(category)) {
      categoriesNumber[category] += 1;
    } else {
      categoriesNumber = {
        ...categoriesNumber,
        [category]: 1,
      };
    }
  }

  return categoriesNumber;
};

const returnCategory = async category => {
  return await prisma.products.findMany({
    where: {
      category: category,
    },
  });
};

const returnUltraSale = async () => {
  return await prisma.products.findMany({
    where: {
      isUltraSale: true,
    },
  });
};

const returnFeatureProducts = async () => {
  return await prisma.products.findMany({
    where: {
      isFeatureProduct: true,
    },
  });
};

const sortBy = (products, method) => {
  switch (method) {
    case 'default':
      return products;
    case 'raiting':
      return products.sort((a, b) => b.raiting - a.raiting);
    case 'price':
      return products.sort((a, b) => a.price.slice(1) - b.price.slice(1));
    case 'name':
      return products.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
  }
};

module.exports = {
  getAllProducts,
  calculateQuantity,
  returnCategory,
  returnUltraSale,
  returnFeatureProducts,
  sortBy,
};
