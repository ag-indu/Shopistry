import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">Shopistry</div>

          {/* Search Bar - Always Visible */}
          <div className="flex-1 mx-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search products"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Search
                </button>
           </div>


          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Add Product</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Cart</a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Shop</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">Contact</a>
        </div>
      )}
    </nav>
  );
}
