import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/db';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const product = await prisma.product.findUnique({
    where: { id: String(id) },
    include: { category: true },
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
}

const ProductPage = ({ product }: { product: Product }) => {
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
};

export default ProductPage;