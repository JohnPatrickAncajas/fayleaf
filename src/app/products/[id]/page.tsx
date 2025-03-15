"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { useParams } from "next/navigation";
import Image from "next/image";

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

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const product = await response.json();
        product.price = Number(product.price);
        setProduct(product);
      } else {
        console.error('Failed to fetch product');
      }
    }
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ productId: product.id, name: product.name, price: product.price, quantity });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Back
      </button>
      <div className="flex flex-col md:flex-row border p-4 rounded-lg">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category.name}</p>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="bg-gray-300 text-black px-4 py-2 rounded-l"
            >
              -
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-300 text-black px-4 py-2 rounded-r"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <Image src={product.imageUrl || '/placeholder.png'} alt={product.name} width={500} height={500} className="rounded-lg" />
        </div>
      </div>
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Added to cart!
        </div>
      )}
    </div>
  );
}