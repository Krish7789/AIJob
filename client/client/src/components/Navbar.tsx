import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onInternshipsClick?: () => void;
  onAboutClick?: () => void;
}

export default function Navbar({ onInternshipsClick, onAboutClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MyLogo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>

          <button
            onClick={() => { 
              onAboutClick?.(); 
            }}
            className="hover:text-gray-300 transition"
          >
            About
          </button>

          <button
            onClick={() => { 
              onInternshipsClick?.(); 
            }}
            className="hover:text-gray-300 transition"
          >
            Internships
          </button>

          <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-6 pb-4 flex flex-col space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition">Home</Link>

          <button
            onClick={() => { 
              setIsOpen(false); 
              onAboutClick?.(); 
            }}
            className="hover:text-gray-300 transition"
          >
            About
          </button>

          <button
            onClick={() => { 
              setIsOpen(false); 
              onInternshipsClick?.(); 
            }}
            className="hover:text-gray-300 transition"
          >
            Internships
          </button>

          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition">Contact</Link>
        </div>
      )}
    </nav>
  );
}
