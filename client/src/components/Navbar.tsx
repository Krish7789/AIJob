import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

type NavItem =
  | { type: "link"; label: string; to: string }
  | { type: "action"; label: string; onClick: () => void };

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

  // User dropdown
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // "More" dropdown
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch {
      toast.error("Logout failed.");
    }
  };

  const goHome = () => {
    //  Permanent fix: no reload needed
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    onHomeClick?.();
  };

  const goInternships = () => {
    navigate("/", { state: { scrollTo: "internships" } });
    onInternshipsClick?.();
  };

  const goAbout = () => {
    navigate("/", { state: { scrollTo: "about" } });
    onAboutClick?.();
  };

  const navItems: NavItem[] = useMemo(
    () => [
      { type: "action", label: "Home", onClick: goHome },
      { type: "link", label: "Knowledge Hub", to: "/knowledge-hub/roadmap" },
      { type: "action", label: "Internships", onClick: goInternships },
      { type: "link", label: "Coding Practice", to: "/coding-practice" },
      { type: "link", label: "Courses", to: "/courses" },
      { type: "link", label: "Resume Analyzer", to: "/analyze-resume" },
      { type: "link", label: "AI Interview", to: "/interview" },
      { type: "link", label: "Company Prep", to: "/company-prep" },
      { type: "action", label: "About", onClick: goAbout },
      { type: "link", label: "Contact", to: "/contact" },

      // Optional install button support (if you need later)
      ...(canInstall && onInstallClick
        ? [{ type: "action" as const, label: "Install App", onClick: onInstallClick }]
        : []),
    ],
    [canInstall, onInstallClick]
  );

 
  const PRIMARY_COUNT = 7;
  const primaryItems = navItems.slice(0, PRIMARY_COUNT);
  const moreItems = navItems.slice(PRIMARY_COUNT);

  const renderNavItem = (item: NavItem, className = "") => {
    if (item.type === "link") {
      return (
        <Link key={item.label} to={item.to} className={className}>
          {item.label}
        </Link>
      );
    }
    return (
      <button
        key={item.label}
        type="button"
        onClick={item.onClick}
        className={className}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <img
            src={logo}
            alt="InternAI Logo"
            className="h-9 w-9 object-contain drop-shadow-md"
          />
          <span className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            InternAI
          </span>
        </button>

        <div className="hidden lg:flex items-center justify-center flex-1">
         
          <div className="flex items-center gap-6 text-gray-200 font-medium whitespace-nowrap">
            {primaryItems.map((item) =>
              renderNavItem(
                item,
                "hover:text-cyan-400 transition"
              )
            )}

            {/* MORE DROPDOWN */}
            {moreItems.length > 0 && (
              <div ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((p) => !p)}
                  className="hover:text-cyan-400 transition flex items-center gap-1"
                >
                  More <span className="text-xs">▾</span>
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 bg-[#1e293b] rounded-xl shadow-lg border border-cyan-600/20 z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        {moreItems.map((item) => (
                          <div key={item.label} className="px-2">
                            {item.type === "link" ? (
                              <Link
                                to={item.to}
                                className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-cyan-600/15 transition"
                              >
                                {item.label}
                              </Link>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  item.onClick();
                                  setMoreOpen(false);
                                }}
                                className="w-full text-left block px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-cyan-600/15 transition"
                              >
                                {item.label}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: User / SignIn + Mobile Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden text-white/80 hover:text-white transition px-2 py-1 rounded-md border border-white/10"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* User menu */}
          <div ref={userDropdownRef} className="relative">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="cursor-pointer w-10 h-10 flex items-center justify-center text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-md hover:scale-105 transition-transform"
                  title={user.displayName || user.email}
                >
                  {(
                    user.displayName?.charAt(0) ||
                    user.email?.charAt(0) ||
                    "?"
                  ).toUpperCase()}
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-48 bg-[#1e293b] rounded-xl shadow-lg border border-cyan-600/20 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-cyan-600/10 text-white">
                        <p className="text-sm font-medium">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigate("/dashboard");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-cyan-600/15 text-white transition-colors"
                      >
                        Dashboard
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-red-600/20 text-red-300 transition-colors"
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
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-white/10 bg-[#0f172a]/95"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
              {navItems.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="px-3 py-2 rounded-lg text-white/85 hover:bg-cyan-600/15 hover:text-white transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    className="text-left px-3 py-2 rounded-lg text-white/85 hover:bg-cyan-600/15 hover:text-white transition"
                    onClick={() => {
                      item.onClick();
                      setMobileOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
