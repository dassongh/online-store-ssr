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

module.exports = {
  getAllProducts,
  calculateQuantity,
  returnCategory,
  returnUltraSale,
  returnFeatureProducts,
};
