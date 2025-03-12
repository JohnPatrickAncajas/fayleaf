import { PrismaClient, Prisma, Role } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main(): Promise<void> {
  // Create categories if they don't exist
  const categories: string[] = ["Indoor Plants", "Outdoor Plants", "Succulents", "Herbs", "Trees", "Flowers"]
  const categoryMap: Record<string, string> = {}

  for (const categoryName of categories) {
    let category = await prisma.category.findUnique({
      where: { name: categoryName },
    })

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName },
      })
    }

    categoryMap[categoryName] = category.id
  }

  // Create many more products
  const products: Array<{
    name: string
    description: string
    price: Prisma.Decimal | string | number
    stock: number
    categoryId: string
    imageUrl: string
  }> = [
    // Indoor Plants (10)
    {
      name: "Monstera Deliciosa",
      description: "The Swiss Cheese Plant, known for its unique leaf holes and easy care",
      price: new Prisma.Decimal(29.99),
      stock: 10,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/monstera.jpg",
    },
    {
      name: "Fiddle Leaf Fig",
      description: "A popular indoor plant with large, glossy leaves that adds elegance to any room",
      price: new Prisma.Decimal(49.99),
      stock: 5,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/fiddle-leaf-fig.jpg",
    },
    {
      name: "Pothos",
      description: "A trailing vine plant that purifies air and is nearly impossible to kill",
      price: new Prisma.Decimal(15.99),
      stock: 25,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/pothos.jpg",
    },
    {
      name: "Snake Plant",
      description: "An architectural plant with stiff leaves that can tolerate neglect",
      price: new Prisma.Decimal(19.99),
      stock: 18,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/snake-plant.jpg",
    },
    {
      name: "ZZ Plant",
      description: "A drought-tolerant plant with glossy leaves that thrives in low light",
      price: new Prisma.Decimal(24.99),
      stock: 12,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/zz-plant.jpg",
    },
    {
      name: "Peace Lily",
      description: "An elegant flowering plant that helps purify indoor air",
      price: new Prisma.Decimal(22.99),
      stock: 15,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/peace-lily.jpg",
    },
    {
      name: "Rubber Plant",
      description: "A hardy plant with thick, glossy leaves that can grow quite tall",
      price: new Prisma.Decimal(27.99),
      stock: 8,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/rubber-plant.jpg",
    },
    {
      name: "Spider Plant",
      description: "A classic houseplant that produces baby plantlets on long stems",
      price: new Prisma.Decimal(14.99),
      stock: 30,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/spider-plant.jpg",
    },
    {
      name: "Chinese Money Plant",
      description: "A trendy plant with round, coin-shaped leaves on thin stems",
      price: new Prisma.Decimal(18.99),
      stock: 14,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/money-plant.jpg",
    },
    {
      name: "Calathea Orbifolia",
      description: "A stunning plant with large, round striped leaves that move throughout the day",
      price: new Prisma.Decimal(34.99),
      stock: 7,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "https://example.com/calathea.jpg",
    },

    // Outdoor Plants (8)
    {
      name: "Rose Bush",
      description: "A beautiful outdoor plant with fragrant flowers in various colors",
      price: new Prisma.Decimal(19.99),
      stock: 15,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/rose-bush.jpg",
    },
    {
      name: "Hydrangea",
      description: "A flowering shrub with large, showy blooms that change color based on soil pH",
      price: new Prisma.Decimal(24.99),
      stock: 12,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/hydrangea.jpg",
    },
    {
      name: "Azalea",
      description: "A flowering shrub with vibrant blooms in spring",
      price: new Prisma.Decimal(22.99),
      stock: 10,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/azalea.jpg",
    },
    {
      name: "Boxwood",
      description: "An evergreen shrub perfect for hedges and topiary",
      price: new Prisma.Decimal(29.99),
      stock: 8,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/boxwood.jpg",
    },
    {
      name: "Lavender",
      description: "A fragrant herb with purple flowers that attracts pollinators",
      price: new Prisma.Decimal(15.99),
      stock: 20,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/lavender.jpg",
    },
    {
      name: "Hosta",
      description: "A shade-loving perennial with attractive foliage",
      price: new Prisma.Decimal(12.99),
      stock: 25,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/hosta.jpg",
    },
    {
      name: "Peony",
      description: "A long-lived perennial with large, fragrant blooms",
      price: new Prisma.Decimal(27.99),
      stock: 10,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/peony.jpg",
    },
    {
      name: "Clematis",
      description: "A climbing vine with showy flowers in various colors",
      price: new Prisma.Decimal(18.99),
      stock: 15,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "https://example.com/clematis.jpg",
    },

    // Succulents (8)
    {
      name: "Aloe Vera",
      description: "A succulent plant with medicinal properties and soothing gel inside its leaves",
      price: new Prisma.Decimal(9.99),
      stock: 20,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/aloe-vera.jpg",
    },
    {
      name: "Echeveria",
      description: "A rosette-forming succulent with colorful, fleshy leaves",
      price: new Prisma.Decimal(8.99),
      stock: 25,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/echeveria.jpg",
    },
    {
      name: "Jade Plant",
      description: "A popular succulent with oval-shaped leaves that symbolizes good luck",
      price: new Prisma.Decimal(12.99),
      stock: 15,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/jade-plant.jpg",
    },
    {
      name: "Haworthia",
      description: "A small succulent with striped or textured leaves that thrives indoors",
      price: new Prisma.Decimal(7.99),
      stock: 30,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/haworthia.jpg",
    },
    {
      name: "String of Pearls",
      description: "A trailing succulent with round bead-like leaves",
      price: new Prisma.Decimal(14.99),
      stock: 12,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/string-of-pearls.jpg",
    },
    {
      name: "Burro's Tail",
      description: "A trailing succulent with plump, overlapping leaves",
      price: new Prisma.Decimal(13.99),
      stock: 14,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/burros-tail.jpg",
    },
    {
      name: "Zebra Plant",
      description: "A small succulent with distinctive white stripes on dark green leaves",
      price: new Prisma.Decimal(8.49),
      stock: 22,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/zebra-plant.jpg",
    },
    {
      name: "Panda Plant",
      description: "A fuzzy succulent with velvety leaves edged in brown",
      price: new Prisma.Decimal(9.49),
      stock: 18,
      categoryId: categoryMap["Succulents"],
      imageUrl: "https://example.com/panda-plant.jpg",
    },

    // Herbs (8)
    {
      name: "Basil",
      description: "A popular culinary herb with aromatic leaves used in many cuisines",
      price: new Prisma.Decimal(4.99),
      stock: 30,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/basil.jpg",
    },
    {
      name: "Mint",
      description: "A refreshing herb used in drinks, desserts, and savory dishes",
      price: new Prisma.Decimal(4.49),
      stock: 35,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/mint.jpg",
    },
    {
      name: "Rosemary",
      description: "A woody herb with needle-like leaves and a strong aroma",
      price: new Prisma.Decimal(5.99),
      stock: 25,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/rosemary.jpg",
    },
    {
      name: "Thyme",
      description: "A versatile herb with tiny leaves and a subtle flavor",
      price: new Prisma.Decimal(4.79),
      stock: 28,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/thyme.jpg",
    },
    {
      name: "Cilantro",
      description: "A divisive herb loved for its unique flavor in many cuisines",
      price: new Prisma.Decimal(3.99),
      stock: 40,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/cilantro.jpg",
    },
    {
      name: "Parsley",
      description: "A mild herb used as a garnish and flavor enhancer",
      price: new Prisma.Decimal(3.89),
      stock: 38,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/parsley.jpg",
    },
    {
      name: "Sage",
      description: "A savory herb with soft, gray-green leaves",
      price: new Prisma.Decimal(5.49),
      stock: 22,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/sage.jpg",
    },
    {
      name: "Chives",
      description: "A mild onion-flavored herb with slender, hollow stems",
      price: new Prisma.Decimal(4.29),
      stock: 32,
      categoryId: categoryMap["Herbs"],
      imageUrl: "https://example.com/chives.jpg",
    },

    // Trees (6)
    {
      name: "Oak Tree",
      description: "A large, majestic tree known for its strength and longevity",
      price: new Prisma.Decimal(99.99),
      stock: 3,
      categoryId: categoryMap["Trees"],
      imageUrl: "https://example.com/oak-tree.jpg",
    },
    {
      name: "Maple Tree",
      description: "A deciduous tree with distinctive lobed leaves that turn vibrant colors in fall",
      price: new Prisma.Decimal(89.99),
      stock: 5,
      categoryId: categoryMap["Trees"],
      imageUrl: "https://example.com/maple-tree.jpg",
    },
    {
      name: "Cherry Blossom Tree",
      description: "A ornamental tree famous for its beautiful pink flowers in spring",
      price: new Prisma.Decimal(129.99),
      stock: 2,
      categoryId: categoryMap["Trees"],
      imageUrl: "https://example.com/cherry-blossom.jpg",
    },
    {
      name: "Weeping Willow",
      description: "A graceful tree with long, sweeping branches that reach toward the ground",
      price: new Prisma.Decimal(79.99),
      stock: 4,
      categoryId: categoryMap["Trees"],
      imageUrl: "https://example.com/weeping-willow.jpg",
    },
    {
      name: "Magnolia Tree",
      description: "A flowering tree with large, fragrant blossoms and glossy leaves",
      price: new Prisma.Decimal(109.99),
      stock: 3,
      categoryId: categoryMap["Trees"],
      imageUrl: "https://example.com/magnolia-tree.jpg",
    },
    {
      name: "Bonsai Juniper",
      description: "A miniature tree trained in the ancient art of bonsai",
      price: new Prisma.Decimal(59.99),
      stock: 8,
      categoryId: categoryMap["Trees"],
      imageUrl: "https://example.com/bonsai-juniper.jpg",
    },

    // Flowers (8)
    {
      name: "Tulip",
      description: "A spring-flowering bulb with cup-shaped flowers in many colors",
      price: new Prisma.Decimal(2.99),
      stock: 50,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/tulip.jpg",
    },
    {
      name: "Sunflower",
      description: "A tall annual with large, sunny yellow flowers that track the sun",
      price: new Prisma.Decimal(3.99),
      stock: 40,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/sunflower.jpg",
    },
    {
      name: "Dahlia",
      description: "A tuberous plant with complex, geometric flowers in many colors",
      price: new Prisma.Decimal(6.99),
      stock: 25,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/dahlia.jpg",
    },
    {
      name: "Lily",
      description: "An elegant flower with trumpet-shaped blooms and sweet fragrance",
      price: new Prisma.Decimal(5.99),
      stock: 30,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/lily.jpg",
    },
    {
      name: "Pansy",
      description: 'A cheerful flower with "face-like" markings that blooms in cool weather',
      price: new Prisma.Decimal(1.99),
      stock: 60,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/pansy.jpg",
    },
    {
      name: "Marigold",
      description: "A bright annual with ruffled flowers in gold, orange, and yellow",
      price: new Prisma.Decimal(2.49),
      stock: 55,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/marigold.jpg",
    },
    {
      name: "Zinnia",
      description: "A easy-to-grow annual with colorful, daisy-like flowers",
      price: new Prisma.Decimal(2.79),
      stock: 45,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/zinnia.jpg",
    },
    {
      name: "Petunia",
      description: "A popular bedding plant with trumpet-shaped flowers all summer long",
      price: new Prisma.Decimal(3.29),
      stock: 50,
      categoryId: categoryMap["Flowers"],
      imageUrl: "https://example.com/petunia.jpg",
    },
  ]

  // Create products in batches to avoid potential issues with large operations
  const batchSize = 10
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize)
    await prisma.product.createMany({
      data: batch,
      skipDuplicates: true,
    })
  }

  // Create users if they don't exist
  const users: Array<{
    email: string
    name: string
    password: string
    role: Role
  }> = [
    { email: "user1@example.com", name: "Alice", password: "password123", role: Role.USER },
    { email: "user2@example.com", name: "Bob", password: "password123", role: Role.USER },
    { email: "admin@example.com", name: "Admin", password: "admin123", role: Role.ADMIN },
  ]

  for (const userData of users) {
    let user = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (!user) {
      const hashedPassword = await hash(userData.password, 10)
      user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          password: hashedPassword,
          role: userData.role,
        },
      })
    }
  }

  // Create orders
  const user = await prisma.user.findUnique({
    where: { email: "user1@example.com" },
  })

  if (user) {
    // Find products for orders with null checks
    const monsteraProduct = await prisma.product.findFirst({ where: { name: "Monstera Deliciosa" } })
    const fiddleLeafProduct = await prisma.product.findFirst({ where: { name: "Fiddle Leaf Fig" } })
    const basilProduct = await prisma.product.findFirst({ where: { name: "Basil" } })
    const aloeProduct = await prisma.product.findFirst({ where: { name: "Aloe Vera" } })
    const tulipProduct = await prisma.product.findFirst({ where: { name: "Tulip" } })

    // Only create orders if all products are found
    if (monsteraProduct && fiddleLeafProduct && basilProduct && aloeProduct && tulipProduct) {
      // Create a sample order with multiple items
      await prisma.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
          total: new Prisma.Decimal(79.98),
          items: {
            create: [
              {
                productId: monsteraProduct.id,
                quantity: 2,
                price: new Prisma.Decimal(29.99),
              },
              {
                productId: fiddleLeafProduct.id,
                quantity: 1,
                price: new Prisma.Decimal(49.99),
              },
            ],
          },
        },
      })

      // Create another order with different items
      await prisma.order.create({
        data: {
          userId: user.id,
          status: "DELIVERED", // Using the correct enum value from your schema
          total: new Prisma.Decimal(38.97),
          items: {
            create: [
              {
                productId: basilProduct.id,
                quantity: 3,
                price: new Prisma.Decimal(4.99),
              },
              {
                productId: aloeProduct.id,
                quantity: 2,
                price: new Prisma.Decimal(9.99),
              },
              {
                productId: tulipProduct.id,
                quantity: 5,
                price: new Prisma.Decimal(2.99),
              },
            ],
          },
        },
      })
    }
  }

  console.log("Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

