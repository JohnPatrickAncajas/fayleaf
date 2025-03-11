import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../lib/db';

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{product.name}</h1>
      <p className="text-gray-600">{product.category.name}</p>
      <p className="mt-2">${product.price.toFixed(2)}</p>
      <p className="mt-4">{product.description}</p>
      <Link href="/" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded">
        Back to Home
      </Link>
    </main>
  );
}