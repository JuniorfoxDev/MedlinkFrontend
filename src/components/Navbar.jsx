import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-gray-800 font-bold text-xl tracking-tight"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-2 rounded-xl bg-blue-600 text-white"
          >
            <Stethoscope size={18} />
          </motion.div>
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            MediLink
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={isActive("/")}>
            Home
          </NavLink>
          <NavLink to="/about" className={isActive("/about")}>
            About
          </NavLink>
          <NavLink to="/contact" className={isActive("/contact")}>
            Contact
          </NavLink>
        </nav>

        {/* Buttons */}
        <div className="flex gap-3 items-center">
          <NavLink
            to="/register"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-sky-500 shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <UserPlus size={16} /> Register
          </NavLink>

          <NavLink
            to="/login"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <LogIn size={16} /> Login
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-center gap-8 py-2 bg-white/70 backdrop-blur-md border-t border-gray-200 shadow-sm text-sm">
        <NavLink to="/" className={isActive("/")}>
          Home
        </NavLink>
        <NavLink to="/about" className={isActive("/about")}>
          About
        </NavLink>
        <NavLink to="/contact" className={isActive("/contact")}>
          Contact
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
