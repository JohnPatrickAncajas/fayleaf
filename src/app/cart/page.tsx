"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.productId} className="mb-4">
                <div className="flex justify-between items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-md">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity > 1 ? item.quantity - 1 : 1)}
                        className="bg-gray-300 text-black px-4 py-2 rounded-l hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="px-4 py-2">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="bg-gray-300 text-black px-4 py-2 rounded-r hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
              <Link href="/checkout" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Cart updated!
        </div>
      )}
    </div>
  );
}