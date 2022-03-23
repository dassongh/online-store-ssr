const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postOrder = async (orderData, id) => {
  return await prisma.orders.create({
    data: {
      ...orderData,
      id,
    },
  });
};

const postOrderProducts = async (productsData, id) => {
  return await prisma.order_products.createMany({
    data: productsData.map(el => ({ ...el, orderId: id })),
  });
};

module.exports = {
  postOrder,
  postOrderProducts,
};
