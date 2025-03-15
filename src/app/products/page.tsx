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
      <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="border p-4 rounded-lg cursor-pointer flex flex-col items-center">
              <Image src={product.imageUrl || '/placeholder.png'} alt={product.name} width={150} height={150} className="mb-4 rounded-lg"/>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.category.name}</p>
              <p className="mt-2">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}