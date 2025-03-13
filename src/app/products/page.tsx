"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
import { useCart } from "../../context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState<Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string | null;
    categoryId: string;
    category: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    createdAt: Date;
    updatedAt: Date;
  }>>([]);
  const { addToCart } = useCart();

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.category.name}</p>
            <p className="mt-2">${Number(product.price).toFixed(2)}</p>
            <button
              onClick={() => addToCart({ productId: product.id, name: product.name, price: Number(product.price), quantity: 1 })}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}