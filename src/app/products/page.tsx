import { prisma } from '../../lib/db';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.category.name}</p>
            <p className="mt-2">${product.price.toFixed(2)}</p>
            {/* Add more product details or a link to the product page */}
          </div>
        ))}
      </div>
    </div>
  )
}