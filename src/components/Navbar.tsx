import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Fayleaf
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-green-200">
            Home
          </Link>
          <Link href="/products" className="hover:text-green-200">
            Products
          </Link>
          <Link href="/about" className="hover:text-green-200">
            About
          </Link>
          <Link href="/contact" className="hover:text-green-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}