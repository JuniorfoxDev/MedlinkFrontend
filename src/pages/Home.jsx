import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/Featured";
import {
  Stethoscope,
  BriefcaseMedical,
  Shield,
  Users,
  HeartPulse,
} from "lucide-react";

// Animation variants for scroll-trigger fade-ups
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f2fe] via-[#ffffff] to-[#dbeafe] text-gray-800"
      style={{ fontFamily: "Manrope, Noto Sans, sans-serif" }}
    >
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-28 px-6 md:px-12">
        {/* Background Layers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8460153/pexels-photo-8460153.jpeg')] bg-cover bg-center brightness-75"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-10 max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight"
          >
            Connect. Collaborate. Cure.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-white/90 mt-4 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Join a verified community of doctors, students, and healthcare
            professionals. Share cases, discuss breakthroughs, and grow together.
          </motion.p>

          <motion.button
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-2xl transition"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Floating lights */}
        <motion.div
          className="absolute -top-10 -right-10 w-60 h-60 bg-blue-400/30 blur-[120px] rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/20 blur-[140px] rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center text-gray-800 mb-4"
        >
          Empowering the Medical Community
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-14 max-w-2xl mx-auto"
        >
          Discover tools designed to help medical professionals and students
          connect, learn, and thrive in a trusted ecosystem.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <FeatureCard
            icon={<Stethoscope className="text-blue-600" size={28} />}
            title="Secure Messaging"
            description="Chat privately with doctors and students across verified networks."
          />
          <FeatureCard
            icon={<BriefcaseMedical className="text-indigo-600" size={28} />}
            title="Case Sharing"
            description="Post, discuss, and review complex medical cases collaboratively."
          />
          <FeatureCard
            icon={<Shield className="text-green-600" size={28} />}
            title="Verified Identity"
            description="Every member is identity-verified, ensuring trust and authenticity."
          />
          <FeatureCard
            icon={<Users className="text-purple-600" size={28} />}
            title="Career & Research"
            description="Discover opportunities, internships, and research collaborations."
          />
        </motion.div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-white/60 backdrop-blur-lg border-t border-gray-100 py-16">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Verified Doctors", value: "15K+" },
            { label: "Medical Students", value: "25K+" },
            { label: "Institutions", value: "500+" },
            { label: "Active Discussions", value: "3K+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              className="p-6 bg-white/70 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <p className="text-3xl font-extrabold text-blue-600">
                {stat.value}
              </p>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative text-center py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto backdrop-blur-lg bg-white/70 border border-white/40 rounded-3xl p-10 shadow-xl relative z-10"
        >
          <HeartPulse className="mx-auto text-blue-600 mb-3" size={36} />
          <h2 className="text-4xl font-extrabold text-[#0d141c] mb-4">
            Ready to elevate your medical career?
          </h2>
          <p className="text-gray-600 mb-6">
            Join MedLink today — the trusted platform for verified medical
            professionals and students.
          </p>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition"
          >
            Join Now
          </motion.button>
        </motion.div>

        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-blue-400/20 blur-[100px] rounded-full"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-400/20 blur-[100px] rounded-full"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-100">
        © {new Date().getFullYear()} MedLink. Built with ❤️ for healthcare
        professionals.
      </footer>
    </div>
  );
};

export default Home;
