import Link from 'next/link';
import { prisma } from '../lib/db';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 24,
    include: { category: true },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Fayleaf!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.category.name}</p>
            <p className="mt-2">${product.price.toFixed(2)}</p>
            <Link href={`/products/${product.id}`} className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}