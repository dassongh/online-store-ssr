const { PrismaClient } = require('@prisma/client');
const categoryConfig = require('./categoryConfig');

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

const returnProductsById = async ids => {
  const products = [];

  for (const id of ids) {
    const product = await prisma.products.findUnique({
      where: {
        id: Number(id),
      },
    });
    products.push(product);
  }

  return products;
};

const returnProductsByQuery = async query => {
  return await prisma.products.findMany({
    where: {
      title: {
        contains: query,
      },
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

const getPages = products => {
  const pages = Math.ceil(products.length / 15);
  const pageArr = [];

  for (let i = 1; i <= pages; i++) {
    pageArr.push(i);
  }

  return pageArr;
};

const returnCategoryName = category => categoryConfig[category];

module.exports = {
  getAllProducts,
  calculateQuantity,
  returnCategory,
  returnUltraSale,
  returnFeatureProducts,
  sortBy,
  getPages,
  returnCategoryName,
  returnProductsById,
  returnProductsByQuery,
};
