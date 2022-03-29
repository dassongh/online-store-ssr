const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductById = async productId => {
  return await prisma.products.findUnique({
    where: {
      id: productId,
    },
  });
};

const postProduct = async product => {
  return await prisma.products.create({
    data: product,
  });
};

const updateProduct = async (productId, key, value) => {
  return await prisma.products.update({
    where: {
      id: Number(productId),
    },
    data: {
      [key]: value,
    },
  });
};

const deleteProduct = async id => {
  return await prisma.products.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
