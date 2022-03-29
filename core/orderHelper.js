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

const returnOrder = async id => {
  return await prisma.orders.findUnique({
    where: {
      id,
    },
  });
};

const returnOrderProducts = async id => {
  return await prisma.order_products.findMany({
    where: {
      orderId: id,
    },
  });
};

const updateStatus = async (id, status) => {
  return await prisma.orders.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

module.exports = {
  postOrder,
  postOrderProducts,
  returnOrder,
  returnOrderProducts,
  updateStatus,
};
