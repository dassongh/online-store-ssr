const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductById = async productId => {
  return await prisma.products.findFirst({
    where: {
      id: productId,
    },
  });
};

module.exports = {
  getProductById,
};
