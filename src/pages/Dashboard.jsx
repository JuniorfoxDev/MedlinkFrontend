import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // ✅ axios instance with interceptor
import Navbar from "../components/DashboardNavbar";
import Sidebar from "../components/DashboardSidebar";
import CreatePost from "../components/CreatePost";
import FeedCard from "../components/FeedCard";
import RightPanel from "../components/RightPanelDashboard";

export default function Feed() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch Logged-in User
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // 🔒 Redirect if not logged in
      if (!token) {
        console.warn("No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        console.log("🔑 Sending /auth/me request with token:", token);
        const res = await api.get("/auth/me");

        // Backend sends { success, user, message }
        if (res.data && res.data.success) {
          console.log("✅ User fetched successfully:", res.data.user);
          setUser(res.data.user);
        } else {
          console.warn("⚠️ Unexpected response:", res.data);
          navigate("/login");
        }
      } catch (err) {
        console.error("❌ Auth Error:", err.response?.data || err.message);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ Show loading until data is fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 text-[#0d141c] font-semibold text-lg">
        Loading your feed...
      </div>
    );
  }

  // ✅ If user still null after loading (token invalid)
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 text-[#0d141c] font-semibold text-lg">
        Session expired, redirecting to login...
      </div>
    );
  }

  // ✅ Main Dashboard Layout
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar user={user} />

      <div className="flex flex-1 max-w-7xl mx-auto w-full mt-24 px-3 gap-4">
        {/* Sidebar */}
        <Sidebar user={user} />

        {/* Main Feed */}
        <main className="flex-1 space-y-4">
          <CreatePost user={user} />

          {/* Example Posts — Replace with API data later */}
          {[1, 2, 3].map((_, i) => (
            <FeedCard key={i} user={user} />
          ))}
        </main>

        {/* Right Panel */}
        <RightPanel user={user} />
      </div>
    </div>
  );
}
