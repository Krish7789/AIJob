import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

interface NavbarProps {
  onHomeClick?: () => void;
  onInternshipsClick?: () => void;
  onAboutClick?: () => void;
  canInstall?: boolean;
  onInstallClick?: () => void;
}

export default function Navbar({
  onHomeClick,
  onInternshipsClick,
  onAboutClick,
  canInstall,
  onInstallClick,
}: NavbarProps) {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#0f172a]/80 backdrop-blur-md shadow-md fixed w-full top-0 left-0 z-50 border-b border-cyan-500/20">
      <Link
        to="/"
        className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105"
        onClick={onHomeClick}
      >
        <img
          src={logo}
          alt="InternAI Logo"
          className="h-10 w-10 object-contain drop-shadow-md"
        />
        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          InternAI
        </span>
      </Link>

      <div className="hidden md:flex gap-8 text-gray-200 font-medium flex-grow justify-center">
  <button onClick={onHomeClick} className="hover:text-cyan-400 transition">
    <Link to="/">Home</Link>
  </button>

  <button
    onClick={() => {
      navigate("/", { state: { scrollTo: "internships" } });
    }}
    className="hover:text-cyan-400 transition"
  >
    Internships
  </button>

  <Link to="/resume-analyzer" className="hover:text-cyan-400 transition">
    Resume Analyzer
  </Link>

  <Link to="/interview" className="hover:text-cyan-400 transition">
    AI Interview
  </Link>

  <Link to="/company-prep" className="hover:text-cyan-400 transition">
    Company Prep
  </Link>

  <Link to="/coding-practice" className="hover:text-cyan-400 transition">
    Coding Practice
  </Link>

  <button
    onClick={() => {
      navigate("/", { state: { scrollTo: "about" } });
    }}
    className="hover:text-cyan-400 transition"
  >
    About
  </button>

  <Link to="/contact" className="hover:text-cyan-400 transition">
    Contact
  </Link>
</div>

      <div ref={dropdownRef} className="relative flex items-center gap-3">
       

        {user ? (
          <>
            <div
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="cursor-pointer w-10 h-10 flex items-center justify-center text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-md hover:scale-105 transition-transform"
              title={user.displayName || user.email}
            >
              {(
                user.displayName?.charAt(0) ||
                user.email?.charAt(0) ||
                "?"
              ).toUpperCase()}
            </div>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-44 bg-[#1e293b] rounded-xl shadow-lg border border-cyan-600/30 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-cyan-600/20 text-white">
                    <p className="text-sm font-medium">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-cyan-600/20 text-white transition-colors"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-600/30 text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            to="/signin"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
