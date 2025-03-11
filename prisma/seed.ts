import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create a category
  const indoorCategory = await prisma.category.create({
    data: { name: 'Indoor Plants' },
  })

  // Create a product
  await prisma.product.create({
    data: {
      name: 'Monstera Deliciosa',
      description: 'The Swiss Cheese Plant',
      price: 29.99,
      stock: 10,
      categoryId: indoorCategory.id,
    },
  })

  // Create a user
  const hashedPassword = await hash('password123', 10)
  await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
      password: hashedPassword,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })