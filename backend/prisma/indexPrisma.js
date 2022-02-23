// const { PrismaClient } = require('@prisma/client');
// const data = require('./products/test');

// const prisma = new PrismaClient();

// async function main() {
//   for (const el of data) {
//     const product = await prisma.products.create({
//       data: el,
//     });
//     console.log(`Created product with id: ${product.id}`);
//   }
// }

// main()
//   .catch(e => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
