import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '../lib/db';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 24,
    include: { category: true },
  });

  return (
    <main className="container mx-auto px-4 py-8">
        <section className="hero bg-green-400 h-96 flex items-center justify-center text-white text-center w-full rounded-lg overflow-hidden bg-cover bg-center">
          <div className="p-2 rounded">
            <h1 className="text-6xl font-bold mb-4 drop-shadow-sm">Grow with Fayleaf!</h1>
            <p className="text-2xl drop-shadow-lg">Every plant you desire</p>
          </div>
        </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="relative pb-1/1">
              <Image src={product.imageUrl || '/placeholder.png'} alt={product.name} width={500} height={500}/>
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.category.name}</p>
              <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
              <Link href={`/products/${product.id}`} className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// Photo by kiki Wang on Unsplash | https://unsplash.com/photos/green-leaf-flowers-TOc_JldXOX8?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash