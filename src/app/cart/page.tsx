"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <Link href="/checkout" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}