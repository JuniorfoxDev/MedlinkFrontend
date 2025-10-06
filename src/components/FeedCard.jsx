import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  X,
  MoreVertical,
  Edit,
  Trash,
  Bookmark,
} from "lucide-react";

const posts = [
  {
    id: 1,
    type: "image",
    author: "Dr. Rahul Sharma",
    role: "Cardiologist, AIIMS Delhi",
    time: "2h ago",
    text: "Just wrapped up our 100th minimally invasive heart valve replacement this quarter 💓 — so proud of the entire cath lab team! Sharing a few moments from the procedure and our case report visuals.",
    media: [
      "https://images.pexels.com/photos/8460156/pexels-photo-8460156.jpeg",
      "https://images.pexels.com/photos/8460183/pexels-photo-8460183.jpeg",
      "https://images.pexels.com/photos/8460158/pexels-photo-8460158.jpeg",
    ],
  },
  {
    id: 2,
    type: "video",
    author: "Dr. Priya Deshmukh",
    role: "Neurosurgeon, Fortis Mumbai",
    time: "5h ago",
    text: "Exploring precision and accuracy with robotic-assisted neurosurgery 🤖🧠. Technology continues to redefine how we approach brain tumor resections. Here’s a short clip from today’s case simulation.",
    media: [
      "https://static.vecteezy.com/system/resources/previews/021/865/988/mp4/male-doctor-talking-to-his-online-patient-listens-to-his-patient-s-complaints-male-doctor-listening-to-patient-in-examination-room-treatment-process-doctor-supervision-video.mp4",
    ],
  },
  {
    id: 3,
    type: "article",
    author: "Dr. Arjun Patel",
    role: "Pediatrician, Apollo Children’s Hospital",
    time: "1d ago",
    text: "Just published our latest research on childhood obesity prevention and early intervention in Indian metros 🩺📊. Let’s promote awareness among parents and schools. Full study available below 👇",
    articleLink: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9194768/",
  },
  {
    id: 4,
    type: "mixed",
    author: "Dr. Kavita Rao",
    role: "Dermatologist, Manipal Hospital",
    time: "8h ago",
    text: "Incredible before-after results using the new diode laser for acne scar reduction ✨. Each case takes patience, science, and consistency — and the results are truly rewarding! 💆‍♀️",
    media: [
      "https://static.vecteezy.com/system/resources/previews/021/865/988/mp4/male-doctor-talking-to-his-online-patient-listens-to-his-patient-s-complaints-male-doctor-listening-to-patient-in-examination-room-treatment-process-doctor-supervision-video.mp4",
      "https://images.pexels.com/photos/3762881/pexels-photo-3762881.jpeg",
    ],
  },
  {
    id: 5,
    type: "gallery",
    author: "Dr. Ramesh Iyer",
    role: "Orthopedic Surgeon, Kokilaben Hospital",
    time: "3d ago",
    text: "Teamwork at its finest 👨‍⚕️👩‍⚕️. We successfully completed 5 complex knee replacement surgeries this week. Post-op mobility looks excellent — sharing some snaps from our OR and recovery ward.",
    media: [
      "https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg",
      "https://images.pexels.com/photos/5452200/pexels-photo-5452200.jpeg",
      "https://images.pexels.com/photos/5452210/pexels-photo-5452210.jpeg",
      "https://images.pexels.com/photos/8460156/pexels-photo-8460156.jpeg",
    ],
  },
  {
    id: 6,
    type: "image",
    author: "Dr. Sneha Varma",
    role: "Gynecologist, Ruby Hall Clinic",
    time: "6h ago",
    text: "Another successful laparoscopic myomectomy today 🌸 Minimal scarring, faster recovery, and happy smiles! Always grateful to my amazing OT team 💕 #WomenCare #Gynaecology",
    media: [
      "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg",
    ],
  },
  {
    id: 7,
    type: "article",
    author: "Dr. Aman Joshi",
    role: "Psychiatrist, NIMHANS Bangalore",
    time: "2d ago",
    text: "Mental health awareness must go beyond clinics — into homes, schools, and workplaces. Sharing my thoughts on integrating CBT into school counseling programs 🧠💬",
    articleLink: "https://www.frontiersin.org/articles/10.3389/fpsyt.2021.789456/full",
  },
];

export default function FeedCard() {
  const [likedPost, setLikedPost] = useState(null);
  const [showComments, setShowComments] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  return (
    <div className="space-y-8 relative">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={`https://randomuser.me/api/portraits/${
                  i % 2 === 0 ? "men" : "women"
                }/${40 + i}.jpg`}
                alt="user"
                className="w-11 h-11 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{post.author}</h3>
                <p className="text-xs text-gray-500">
                  {post.role} • {post.time}
                </p>
              </div>
            </div>

            {/* 3-dot Menu */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setMenuOpen(menuOpen === post.id ? null : post.id)
                }
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical size={18} />
              </motion.button>

              <AnimatePresence>
                {menuOpen === post.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-20"
                  >
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Edit size={15} /> Edit Post
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Trash size={15} /> Delete Post
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Bookmark size={15} /> Save Post
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Text */}
          <p className="px-4 text-gray-700 text-sm leading-relaxed">
            {post.text}
          </p>

          {/* Media Grid Section */}
          <div className="p-4">
            {post.media && post.media.length > 0 && (
              <div
                className={`grid ${
                  post.media.length === 1
                    ? "grid-cols-1"
                    : post.media.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3"
                } gap-2`}
              >
                {post.media.map((m, idx) =>
                  m.endsWith(".mp4") ? (
                    <motion.video
                      key={idx}
                      controls
                      className="rounded-xl w-full h-[250px] object-cover cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedMedia(m)}
                    >
                      <source src={m} type="video/mp4" />
                    </motion.video>
                  ) : (
                    <motion.img
                      key={idx}
                      src={m}
                      alt="media"
                      className={`rounded-xl w-full object-cover ${
                        post.media.length === 1 ? "h-auto" : "h-[250px]"
                      } cursor-pointer`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedMedia(m)}
                    />
                  )
                )}
              </div>
            )}
          </div>

          {/* Reactions */}
          <div className="flex justify-around text-gray-600 border-t border-gray-100 p-3 text-sm font-medium">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-1 ${
                likedPost === post.id ? "text-red-500" : "hover:text-blue-500"
              }`}
              onClick={() =>
                setLikedPost(likedPost === post.id ? null : post.id)
              }
            >
              <Heart
                size={18}
                fill={likedPost === post.id ? "red" : "none"}
                strokeWidth={likedPost === post.id ? 0 : 2}
              />
              Like
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 hover:text-blue-500"
              onClick={() =>
                setShowComments(showComments === post.id ? null : post.id)
              }
            >
              <MessageCircle size={18} /> Comment
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <Share2 size={18} /> Share
            </motion.button>
          </div>

          {/* Comment Section */}
          <AnimatePresence>
            {showComments === post.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4 border-t bg-gray-50"
              >
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 border rounded-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button className="bg-blue-600 text-white px-3 rounded-full text-sm flex items-center gap-1 hover:bg-blue-700 transition">
                    <Send size={14} /> Post
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  💬 No comments yet. Be the first!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Fullscreen Media Viewer */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-auto"
            >
              {selectedMedia.endsWith(".mp4") ? (
                <video
                  src={selectedMedia}
                  controls
                  autoPlay
                  className="rounded-2xl max-h-[85vh] object-contain"
                />
              ) : (
                <img
                  src={selectedMedia}
                  alt="Full view"
                  className="rounded-2xl max-h-[85vh] object-contain"
                />
              )}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-2 right-2 bg-white/20 text-white p-2 rounded-full hover:bg-white/40 transition"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
