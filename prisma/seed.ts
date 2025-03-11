import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create categories if they don't exist
  let indoorCategory = await prisma.category.findUnique({
    where: { name: 'Indoor Plants' },
  });

  if (!indoorCategory) {
    indoorCategory = await prisma.category.create({
      data: { name: 'Indoor Plants' },
    });
  }

  let outdoorCategory = await prisma.category.findUnique({
    where: { name: 'Outdoor Plants' },
  });

  if (!outdoorCategory) {
    outdoorCategory = await prisma.category.create({
      data: { name: 'Outdoor Plants' },
    });
  }

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Monstera Deliciosa',
        description: 'The Swiss Cheese Plant',
        price: 29.99,
        stock: 10,
        categoryId: indoorCategory.id,
        imageUrl: 'https://example.com/monstera.jpg',
      },
      {
        name: 'Fiddle Leaf Fig',
        description: 'A popular indoor plant with large, glossy leaves',
        price: 49.99,
        stock: 5,
        categoryId: indoorCategory.id,
        imageUrl: 'https://example.com/fiddle-leaf-fig.jpg',
      },
      {
        name: 'Rose Bush',
        description: 'A beautiful outdoor plant with fragrant flowers',
        price: 19.99,
        stock: 15,
        categoryId: outdoorCategory.id,
        imageUrl: 'https://example.com/rose-bush.jpg',
      },
    ],
  });

  // Create a user if they don't exist
  let user = await prisma.user.findUnique({
    where: { email: 'user@example.com' },
  });

  if (!user) {
    const hashedPassword = await hash('password123', 10);
    user = await prisma.user.create({
      data: {
        email: 'user@example.com',
        name: 'John Doe',
        password: hashedPassword,
      },
    });
  }

  // Create an order
  await prisma.order.create({
    data: {
      userId: user.id,
      status: 'PENDING',
      total: 79.98,
      items: {
        create: [
          {
            productId: (await prisma.product.findFirst({ where: { name: 'Monstera Deliciosa' } }))!.id,
            quantity: 2,
            price: 29.99,
          },
          {
            productId: (await prisma.product.findFirst({ where: { name: 'Fiddle Leaf Fig' } }))!.id,
            quantity: 1,
            price: 49.99,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });