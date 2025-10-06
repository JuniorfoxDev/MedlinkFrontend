import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, CheckCircle2, Sparkles } from "lucide-react";

export default function RightPanel() {
  const allSuggestions = [
    {
      name: "Dr. Sneha Rao",
      role: "Dermatologist",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Aakash Patil",
      role: "Pediatrician",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Dr. Nisha Verma",
      role: "Radiologist",
      avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    },
    {
      name: "Dr. Karan Desai",
      role: "Cardiologist",
      avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    },
    {
      name: "Dr. Ritu Bansal",
      role: "Gynecologist",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Dr. Harshad Singh",
      role: "Neurosurgeon",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];

  const [connected, setConnected] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleConnect = (name) => {
    if (connected.includes(name)) return;
    setConnected((prev) => [...prev, name]);
  };

  const visibleSuggestions = showAll
    ? allSuggestions
    : allSuggestions.slice(0, 3);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex flex-col w-72 bg-white rounded-2xl shadow-md p-5 h-fit sticky top-24 border border-gray-100"
    >
      {/* 🧩 Header with shimmer animation */}
      <motion.h2 className="font-semibold text-gray-800 mb-4 text-lg bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-[length:200%_auto] text-transparent bg-clip-text animate-[shine_4s_linear_infinite]">
        Suggested Connections
      </motion.h2>

      <style>
        {`@keyframes shine {
          to { background-position: 200% center; }
        }`}
      </style>

      {/* 💡 Suggestions List */}
      <div className="space-y-3">
        {visibleSuggestions.map((user, i) => {
          const isConnected = connected.includes(user.name);

          return (
            <motion.div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer group hover:shadow-sm transition-all border border-transparent hover:border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>

              {/* ⚡ Connect Button with animation */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleConnect(user.name)}
                disabled={isConnected}
                className={`relative flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300
                  ${
                    isConnected
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  }`}
              >
                {isConnected ? (
                  <>
                    <CheckCircle2 size={14} /> Connected
                  </>
                ) : (
                  <>
                    <UserPlus size={14} /> Connect
                  </>
                )}

                {/* 🎇 Sparkle Animation on Connect */}
                <AnimatePresence>
                  {isConnected && (
                    <motion.span
                      className="absolute inset-0 bg-green-300/40 rounded-md"
                      initial={{ scale: 0.3, opacity: 0.8 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* 🧭 Show More / Less Button */}
      <AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition flex items-center gap-1 justify-center"
          onClick={() => setShowAll(!showAll)}
        >
          <Sparkles size={14} />
          {showAll ? "Show Less" : "Show More"}
        </motion.button>
      </AnimatePresence>

      {/* ✨ Small motivational footer */}
      <div className="text-xs text-gray-400 text-center mt-4 border-t border-gray-100 pt-3 italic">
        “Expand your circle. Collaboration fuels innovation.”
      </div>
    </motion.aside>
  );
}
