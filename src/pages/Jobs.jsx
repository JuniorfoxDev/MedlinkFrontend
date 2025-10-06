import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  X,
  Building,
  Plus,
  Loader2,
} from "lucide-react";
import Sidebar from "../components/DashboardSidebar";
import Navbar from "../components/DashboardNavbar";
import api from "../api/axiosInstance";
import CreateJobModal from "../components/CreateJobModal";
import toast, { Toaster } from "react-hot-toast";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [user, setUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🩺 Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("User load failed", err);
      }
    };
    loadUser();
  }, []);

  // 💼 Load jobs
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/jobs");
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error("Jobs fetch failed", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const refreshJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data.jobs || []);
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.hospital.toLowerCase().includes(search.toLowerCase())
  );

  // 💾 Save / Unsave job
  const handleSave = async (jobId) => {
    try {
      setSaving(true);
      const res = await api.post(`/jobs/${jobId}/save`);
      toast.success(res.data.saved ? "💾 Job saved!" : "❌ Removed from saved");
      setJobs((prev) =>
        prev.map((j) => (j._id === jobId ? { ...j, saved: res.data.saved } : j))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  // 📨 Apply job
  const handleApply = async (jobId) => {
    try {
      setApplying(true);
      await api.post(`/jobs/${jobId}/apply`, { coverLetter });
      toast.success("✅ Applied successfully!");
      setSelectedJob(null);
      setCoverLetter("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f9fc] via-[#eef2f7] to-[#f6fbff] flex flex-col">
      <Toaster position="top-right" />
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 px-4 gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Job Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 relative p-6 rounded-3xl border border-gray-200 shadow-lg bg-white/70 backdrop-blur-xl overflow-hidden"
        >
          {/* Floating gradient background */}
          <motion.div
            animate={{
              background:
                "radial-gradient(circle at 30% 30%, #cce4ff40, transparent 60%), radial-gradient(circle at 70% 70%, #e0f7f340, transparent 60%)",
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            className="absolute inset-0 -z-10"
          />

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
              <Briefcase size={24} className="text-blue-600" />
              Explore Medical Jobs
            </h1>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center bg-white/70 px-3 py-2 rounded-full border border-gray-200 shadow-sm w-full md:w-64">
                <Search size={16} className="text-gray-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title or hospital..."
                  className="bg-transparent outline-none ml-2 text-sm w-full"
                />
              </div>

              {/* Doctor-only button */}
              {user?.role === "doctor" && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
                >
                  <Plus size={18} /> Post Job
                </motion.button>
              )}
            </div>
          </div>

          {/* Job list or Loader */}
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-blue-600" size={28} />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <p>No jobs found.</p>
              {user?.role === "doctor" && (
                <p className="text-blue-500 font-medium mt-2">
                  Create your first job post!
                </p>
              )}
            </div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all relative"
                >
                  {/* Applicant badge */}
                  {job.applicants?.length > 0 && (
                    <motion.div
                      layout
                      className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow"
                    >
                      {job.applicants.length} Applicant
                      {job.applicants.length > 1 ? "s" : ""}
                    </motion.div>
                  )}

                  {/* Card content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Building size={14} /> {job.hospital}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {job.location}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Bottom actions */}
                  <div className="flex justify-between items-center mt-5">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      {job.type}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedJob(job)}
                        className="px-3 py-1 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        View
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleApply(job._id)}
                        className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
                      >
                        Apply
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 🩺 Create Job Modal */}
      <CreateJobModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={refreshJobs}
      />

      {/* 📄 Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 w-[90%] max-w-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>

              <h2 className="text-xl font-semibold text-gray-800">
                {selectedJob.title}
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Building size={14} /> {selectedJob.hospital} •{" "}
                <MapPin size={12} /> {selectedJob.location}
              </p>

              <p className="mt-4 text-gray-700 leading-relaxed">
                {selectedJob.description}
              </p>

              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a short cover letter (optional)"
                className="w-full mt-5 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white/70"
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApply(selectedJob._id)}
                  disabled={applying}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  {applying ? "Applying..." : "Apply Now"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
