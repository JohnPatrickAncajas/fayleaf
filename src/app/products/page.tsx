"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: {
    name: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const products = await response.json();
      setProducts(products.map((product: Product) => ({
        ...product,
        price: Number(product.price)
      })));
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="relative pb-1/1">
              <Image src={product.imageUrl || '/placeholder.png'} alt={product.name} width={500} height={500} />
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
    </div>
  );
}