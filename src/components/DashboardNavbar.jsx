import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutAnim, setLogoutAnim] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🎬 Handle Logout Animation
  const handleLogout = () => {
    setLogoutAnim(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, 1600);
  };

  return (
    <>
      {/* 🔷 NAVBAR */}
      <nav className="bg-white/60 backdrop-blur-lg shadow-md fixed top-0 left-0 right-0 z-50 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.h1
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-blue-600 cursor-pointer select-none"
            onClick={() => navigate("/dashboard")}
          >
            MediLink
          </motion.h1>

          {/* Search + Icons */}
          <div className="flex items-center space-x-4 relative">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white/70"
              />
            </div>

            {/* Bell Icon */}
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer"
            >
              <Bell className="text-gray-600 hover:text-blue-600 transition-all duration-200" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </motion.div>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User
                  className="text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-200"
                  onClick={() => setMenuOpen((prev) => !prev)}
                />
              </motion.div>

              {/* Dropdown */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    {/* Profile Button */}
                    <motion.button
                      onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                      }}
                      whileHover={{
                        scale: 1.02,
                        background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                        color: "#fff",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300"
                    >
                      <UserCircle2 size={16} /> View Profile
                    </motion.button>

                    {/* Divider */}
                    <div className="h-[1px] bg-gray-200 w-full"></div>

                    {/* Logout Button */}
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{
                        scale: 1.05,
                        background:
                          "linear-gradient(90deg, #0072ff, #00c6ff, #00f2fe)",
                        color: "#fff",
                        boxShadow:
                          "0 4px 20px rgba(0, 150, 255, 0.4), 0 0 15px rgba(0, 200, 255, 0.3)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300"
                    >
                      <LogOut size={16} /> Logout
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* 🎬 CINEMATIC LOGOUT OVERLAY */}
      <AnimatePresence>
        {logoutAnim && (
          <>
            {/* Background Blur + Fade */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Center Animation Text */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-[9999]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.div
                className="text-white text-3xl font-bold tracking-wide"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
                Logging you out...
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
