import { PrismaClient, Prisma, Role } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

// npx prisma migrate reset for resetting
// npx prisma migrate dev for creating
// npx prisma db push for pushing
// npm run seed for seeding
// npm run dev for running

// reset -> push -> seed for full reset

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
      imageUrl: "/images/monstera-deliciosa.jpg",
      // Photo by feey on Unsplash | https://unsplash.com/photos/green-plant-on-white-ceramic-pot-bwsTJMnhcwE?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Fiddle Leaf Fig",
      description: "A popular indoor plant with large, glossy leaves that adds elegance to any room",
      price: new Prisma.Decimal(49.99),
      stock: 5,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/fiddle-leaf-fig.jpg",
      // Photo by Kara Eads on Unsplash | https://unsplash.com/photos/green-leafed-plant-in-white-pot-EbLX7oRo4vI?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Pothos",
      description: "A trailing vine plant that purifies air and is nearly impossible to kill",
      price: new Prisma.Decimal(15.99),
      stock: 25,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/pothos.jpg",
      // Photo by feey on Unsplash | https://unsplash.com/photos/green-plant-on-white-ceramic-vase-GG9Gh1_FjbM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Snake Plant",
      description: "An architectural plant with stiff leaves that can tolerate neglect",
      price: new Prisma.Decimal(19.99),
      stock: 18,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/snake-plant.jpg",
      // Photo by Gabriella Clare Marino on Unsplash | https://unsplash.com/photos/green-plant-in-white-pot-m7Gos2-mS-A?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "ZZ Plant",
      description: "A drought-tolerant plant with glossy leaves that thrives in low light",
      price: new Prisma.Decimal(24.99),
      stock: 12,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/zz-plant.jpg",
      //Photo by feey on Unsplash | https://unsplash.com/photos/a-person-holding-a-potted-plant-in-their-hands-1gwjE0c3PSQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Peace Lily",
      description: "An elegant flowering plant that helps purify indoor air",
      price: new Prisma.Decimal(22.99),
      stock: 15,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/peace-lily.jpg",
      // Photo by feey on Unsplash | https://unsplash.com/photos/person-holding-white-ceramic-mug-with-green-plant-lmczPemWjQQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Rubber Plant",
      description: "A hardy plant with thick, glossy leaves that can grow quite tall",
      price: new Prisma.Decimal(27.99),
      stock: 8,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/rubber-plant.jpg",
      // Photo by Scott Webb on Unsplash | https://unsplash.com/photos/green-leaf-plant-on-brown-stem-Mp38Mp9TJH8?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Spider Plant",
      description: "A classic houseplant that produces baby plantlets on long stems",
      price: new Prisma.Decimal(14.99),
      stock: 30,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/spider-plant.jpg",
      // Photo by Lucian Alexe on Unsplash | https://unsplash.com/photos/green-leaf-plant-in-pot-Si8rYoK5tf0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Chinese Money Plant",
      description: "A trendy plant with round, coin-shaped leaves on thin stems",
      price: new Prisma.Decimal(18.99),
      stock: 14,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/money-plant.jpg",
      // Photo by Natalia Gasiorowska on Unsplash | https://unsplash.com/photos/a-plant-with-green-leaves-in-a-white-basket-2NyDhFWvPc8?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Calathea Orbifolia",
      description: "A stunning plant with large, round striped leaves that move throughout the day",
      price: new Prisma.Decimal(34.99),
      stock: 7,
      categoryId: categoryMap["Indoor Plants"],
      imageUrl: "/images/calathea.jpg",
      // Photo by Gigi Visacri on Unsplash | https://unsplash.com/photos/a-green-plant-in-a-white-pot-on-a-table-rNjEk8d2vmQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },

    // Outdoor Plants (8)
    {
      name: "Rose Bush",
      description: "A beautiful outdoor plant with fragrant flowers in various colors",
      price: new Prisma.Decimal(19.99),
      stock: 15,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/rose-bush.jpg",
      // Photo by Irina Iriser on Unsplash | https://unsplash.com/photos/red-petal-flower-b_E4GcFpcFI?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Hydrangea",
      description: "A flowering shrub with large, showy blooms that change color based on soil pH",
      price: new Prisma.Decimal(24.99),
      stock: 12,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/hydrangea.jpg",
      // Photo by Josefin on Unsplash | https://unsplash.com/photos/blue-and-yellow-petaled-flowers-under-blue-sky-LvEOWMyr-Bc?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Azalea",
      description: "A flowering shrub with vibrant blooms in spring",
      price: new Prisma.Decimal(22.99),
      stock: 10,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/azalea.jpg",
      // Photo by Alli Remler on Unsplash | https://unsplash.com/photos/pink-flowers-in-tilt-shift-lens-xvgfN608odk?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Boxwood",
      description: "An evergreen shrub perfect for hedges and topiary",
      price: new Prisma.Decimal(29.99),
      stock: 8,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/boxwood.jpg",
      // Photo by Anatoly Najmitenko on Unsplash | https://unsplash.com/photos/green-leaf-plants-under-white-and-gray-skies--yGFRuBHKVw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Lavender",
      description: "A fragrant herb with purple flowers that attracts pollinators",
      price: new Prisma.Decimal(15.99),
      stock: 20,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/lavender.jpg",
      // Photo by Mario Mendez on Unsplash | https://unsplash.com/photos/purple-flower-field-during-daytime-kkhww8996mg?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Hosta",
      description: "A shade-loving perennial with attractive foliage",
      price: new Prisma.Decimal(12.99),
      stock: 25,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/hosta.jpg",
      // Photo by Yoksel 🌿 Zok on Unsplash | https://unsplash.com/photos/green-outdoor-plant-I-dMihXQfU0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Peony",
      description: "A long-lived perennial with large, fragrant blooms",
      price: new Prisma.Decimal(27.99),
      stock: 10,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/peony.jpg",
      // Photo by Anna Evans on Unsplash | https://unsplash.com/photos/a-group-of-flowers-clUC2tTFOXQ?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Clematis",
      description: "A climbing vine with showy flowers in various colors",
      price: new Prisma.Decimal(18.99),
      stock: 15,
      categoryId: categoryMap["Outdoor Plants"],
      imageUrl: "/images/clematis.jpg",
      // Photo by EJ Strat on Unsplash | https://unsplash.com/photos/a-bunch-of-purple-flowers-that-are-on-a-plant-4CxvctOFmVg?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },

    // Succulents (7)
    {
      name: "Aloe Vera",
      description: "A succulent plant with medicinal properties and soothing gel inside its leaves",
      price: new Prisma.Decimal(9.99),
      stock: 20,
      categoryId: categoryMap["Succulents"],
      imageUrl: "/images/aloe-vera.jpg",
      // Photo by Stephanie Harvey on Unsplash | https://unsplash.com/photos/aloe-vera-in-white-pot-T0inbt7nRME?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Echeveria",
      description: "A rosette-forming succulent with colorful, fleshy leaves",
      price: new Prisma.Decimal(8.99),
      stock: 25,
      categoryId: categoryMap["Succulents"],
      imageUrl: "/images/echeveria.jpg",
      // Photo by Wander Fleur on Unsplash | https://unsplash.com/photos/green-succulent-plant-in-white-pot-cB1UL_11g5E?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Jade Plant",
      description: "A popular succulent with oval-shaped leaves that symbolizes good luck",
      price: new Prisma.Decimal(12.99),
      stock: 15,
      categoryId: categoryMap["Succulents"],
      imageUrl: "/images/jade-plant.jpg",
      // Photo by Susan Wilkinson on Unsplash | https://unsplash.com/photos/green-plant-on-white-ceramic-pot-Q0w0LGkHokE?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Haworthia",
      description: "A small succulent with striped or textured leaves that thrives indoors",
      price: new Prisma.Decimal(7.99),
      stock: 30,
      categoryId: categoryMap["Succulents"],
      imageUrl: "/images/haworthia.jpg",
      // Photo by Audumbar Haldankar on Unsplash | https://unsplash.com/photos/a-close-up-of-a-plant-in-a-pot-on-a-table-uNv0jYCzVPs?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "String of Pearls",
      description: "A trailing succulent with round bead-like leaves",
      price: new Prisma.Decimal(14.99),
      stock: 12,
      categoryId: categoryMap["Succulents"],
      imageUrl: "/images/string-of-pearls.jpg",
      // Photo by Kelly Sikkema on Unsplash | https://unsplash.com/photos/a-potted-plant-sitting-on-top-of-a-window-sill-1b7M8MN8xdk?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Burro's Tail",
      description: "A trailing succulent with plump, overlapping leaves",
      price: new Prisma.Decimal(13.99),
      stock: 14,
      categoryId: categoryMap["Succulents"],
      imageUrl: "/images/burros-tail.jpg",
      // Photo by Audumbar Haldankar on Unsplash | https://unsplash.com/photos/a-small-green-plant-in-a-white-pot-XZQA_DI5Rm4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Zebra Plant",
      description: "A small succulent with distinctive white stripes on dark green leaves",
      price: new Prisma.Decimal(8.49),
      stock: 22,
      categoryId: categoryMap["Succulents"],
      imageUrl: "/images/zebra-plant.jpg",
      // Photo by Kara Eads on Unsplash | https://unsplash.com/photos/green-aloe-vera-plant-ylNifQf8TiY?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash

    },

    // Herbs (7)
    {
      name: "Basil",
      description: "A popular culinary herb with aromatic leaves used in many cuisines",
      price: new Prisma.Decimal(4.99),
      stock: 30,
      categoryId: categoryMap["Herbs"],
      imageUrl: "/images/basil.jpg",
      // Photo by Alissa De Leva on Unsplash | https://unsplash.com/photos/green-leaves-BEabqjCtzVo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Mint",
      description: "A refreshing herb used in drinks, desserts, and savory dishes",
      price: new Prisma.Decimal(4.49),
      stock: 35,
      categoryId: categoryMap["Herbs"],
      imageUrl: "/images/mint.jpg",
      // Photo by Victor Serban on Unsplash | https://unsplash.com/photos/green-leaves-in-macro-lens-whTrv7kvGJY?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Rosemary",
      description: "A woody herb with needlel-ike leaves and a strong aroma",
      price: new Prisma.Decimal(5.99),
      stock: 25,
      categoryId: categoryMap["Herbs"],
      imageUrl: "/images/rosemary.jpg",
      // Photo by Zé Maria on Unsplash | https://unsplash.com/photos/green-plant-on-brown-clay-pot-v5Px2pav-MM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Thyme",
      description: "A versatile herb with tiny leaves and a subtle flavor",
      price: new Prisma.Decimal(4.79),
      stock: 28,
      categoryId: categoryMap["Herbs"],
      imageUrl: "/images/thyme.jpg",
      // Photo by Anja Junghans on Unsplash | https://unsplash.com/photos/pink-flowers-in-tilt-shift-lens-qjuJBB5BsAY?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Cilantro",
      description: "A divisive herb loved for its unique flavor in many cuisines",
      price: new Prisma.Decimal(3.99),
      stock: 40,
      categoryId: categoryMap["Herbs"],
      imageUrl: "/images/cilantro.jpg",
      // Photo by JACQUELINE BRANDWAYN on Unsplash | https://unsplash.com/photos/green-leaves-plant-during-daytime-sNjKMbL5xWU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Parsley",
      description: "A mild herb used as a garnish and flavor enhancer",
      price: new Prisma.Decimal(3.89),
      stock: 38,
      categoryId: categoryMap["Herbs"],
      imageUrl: "/images/parsley.jpg",
      // Photo by Chandan Chaurasia on Unsplash | https://unsplash.com/photos/green-plant-in-close-up-photography-N73L0EzbJ8Y?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Sage",
      description: "A savory herb with soft, gray-green leaves",
      price: new Prisma.Decimal(5.49),
      stock: 22,
      categoryId: categoryMap["Herbs"],
      imageUrl: "/images/sage.jpg",
      // Photo by Jackie Hope on Unsplash | https://unsplash.com/photos/green-and-purple-leaves-plant-96zlc1Bt51w?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },

    // Trees (6)
    {
      name: "Oak Tree",
      description: "A large, majestic tree known for its strength and longevity",
      price: new Prisma.Decimal(99.99),
      stock: 3,
      categoryId: categoryMap["Trees"],
      imageUrl: "/images/oak-tree.jpg",
      // Photo by Wolfgang Hasselmann on Unsplash | https://unsplash.com/photos/green-tree-on-green-grass-field-under-blue-sky-during-daytime-pe-GUtsGMsM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Maple Tree",
      description: "A deciduous tree with distinctive lobed leaves that turn vibrant colors in fall",
      price: new Prisma.Decimal(89.99),
      stock: 5,
      categoryId: categoryMap["Trees"],
      imageUrl: "/images/maple-tree.jpg",
      // Photo by Steve Haines on Unsplash | https://unsplash.com/photos/red-leaf-tree-near-body-of-water-during-daytime-BsmkN8A8MZA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Cherry Blossom Tree",
      description: "A ornamental tree famous for its beautiful pink flowers in spring",
      price: new Prisma.Decimal(129.99),
      stock: 2,
      categoryId: categoryMap["Trees"],
      imageUrl: "/images/cherry-blossom-tree.jpg",
      // Photo by Alex Ramon on Unsplash | https://unsplash.com/photos/a-tree-in-the-middle-of-a-grassy-field-5Sd_MdxMtdA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Weeping Willow",
      description: "A graceful tree with long, sweeping branches that reach toward the ground",
      price: new Prisma.Decimal(79.99),
      stock: 4,
      categoryId: categoryMap["Trees"],
      imageUrl: "/images/weeping-willow-tree.jpg",
      // Photo by Fran on Unsplash | https://unsplash.com/photos/a-tree-with-yellow-leaves-next-to-a-body-of-water-u2HDybvBrHU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Magnolia Tree",
      description: "A flowering tree with large, fragrant blossoms and glossy leaves",
      price: new Prisma.Decimal(109.99),
      stock: 3,
      categoryId: categoryMap["Trees"],
      imageUrl: "/images/magnolia-tree.jpg",
      // Photo by Alexandra on Unsplash | https://unsplash.com/photos/pink-cherry-blossom-tree-under-blue-sky-during-daytime-jjoQnNS1bu4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },
    {
      name: "Bonsai Juniper",
      description: "A miniature tree trained in the ancient art of bonsai",
      price: new Prisma.Decimal(59.99),
      stock: 8,
      categoryId: categoryMap["Trees"],
      imageUrl: "/images/bonsai-juniper-tree.jpg",
      // Photo by Linmiao Xu on Unsplash | https://unsplash.com/photos/a-bonsai-tree-in-a-pot-on-a-rock-garden-hC33lVuI_co?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash
    },

    // Flowers (8)
    {
      name: "Tulip",
      description: "A spring-flowering bulb with cup-shaped flowers in many colors",
      price: new Prisma.Decimal(2.99),
      stock: 50,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/tulip.jpg",
      // 
    },
    {
      name: "Sunflower",
      description: "A tall annual with large, sunny yellow flowers that track the sun",
      price: new Prisma.Decimal(3.99),
      stock: 40,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/sunflower.jpg",
    },
    {
      name: "Dahlia",
      description: "A tuberous plant with complex, geometric flowers in many colors",
      price: new Prisma.Decimal(6.99),
      stock: 25,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/dahlia.jpg",
    },
    {
      name: "Lily",
      description: "An elegant flower with trumpet-shaped blooms and sweet fragrance",
      price: new Prisma.Decimal(5.99),
      stock: 30,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/lily.jpg",
    },
    {
      name: "Pansy",
      description: 'A cheerful flower with "face-like" markings that blooms in cool weather',
      price: new Prisma.Decimal(1.99),
      stock: 60,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/pansy.jpg",
    },
    {
      name: "Marigold",
      description: "A bright annual with ruffled flowers in gold, orange, and yellow",
      price: new Prisma.Decimal(2.49),
      stock: 55,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/marigold.jpg",
    },
    {
      name: "Zinnia",
      description: "A easy-to-grow annual with colorful, daisy-like flowers",
      price: new Prisma.Decimal(2.79),
      stock: 45,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/zinnia.jpg",
    },
    {
      name: "Petunia",
      description: "A popular bedding plant with trumpet-shaped flowers all summer long",
      price: new Prisma.Decimal(3.29),
      stock: 50,
      categoryId: categoryMap["Flowers"],
      imageUrl: "/images/petunia.jpg",
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

