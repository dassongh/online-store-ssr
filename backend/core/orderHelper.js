const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postOrder = async ({ orderData }, id) => {
  return await prisma.orders.create({
    data: {
      ...orderData,
      id,
    },
  });
};

const postOrderProducts = async ({ products }, id) => {};

module.exports = {
  postOrder,
  postOrderProducts,
};
