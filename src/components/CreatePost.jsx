import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  Video,
  FileText,
  X,
  UploadCloud,
  Sparkles,
  Smile,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/axiosInstance"; // ✅ your axios instance with baseURL set

export default function CreatePost() {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]); // { url, type, name, file }
  const [showEmoji, setShowEmoji] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [compact, setCompact] = useState(false);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const pickerRef = useRef(null);
  const mountedRef = useRef(true);

  // ✅ Compact Mode on Scroll
  useEffect(() => {
    const handleScroll = () => setCompact(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Cleanup URLs when unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      media.forEach((m) => {
        try {
          URL.revokeObjectURL(m.url);
        } catch (e) {}
      });
    };
  }, []); // eslint-disable-line

  // ✅ Create previews and store file references
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.includes("video") ? "video" : "image",
      name: file.name,
      file, // keep the original file for upload
    }));

    setMedia((prev) => [...prev, ...previews]);
    e.target.value = ""; // reset input
  };

  // ✅ Remove a single media file
  const removeMediaAt = (index) => {
    setMedia((prev) => {
      const item = prev[index];
      if (item) {
        try {
          URL.revokeObjectURL(item.url);
        } catch (e) {}
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // ✅ Emoji Handler
  const onEmojiClick = (emojiData) => {
    const emoji = emojiData?.emoji ?? "";
    setText((prev) => prev + emoji);
  };

  // ✅ Post submission handler
  const handlePost = async () => {
    if (!text.trim() && media.length === 0)
      return toast.error("⚠️ Post cannot be empty!");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("text", text);
      media.forEach((m) => formData.append("media", m.file));

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setPostSuccess(true);
      toast.success("✅ Post created successfully!");

      // reset after short delay
      setTimeout(() => {
        if (!mountedRef.current) return;
        setText("");
        setMedia([]);
        setPostSuccess(false);
      }, 1200);
    } catch (err) {
      console.error("❌ Post Error:", err);
      toast.error("Failed to create post. Try again.");
    }
  };

  // ✅ Ctrl + Enter shortcut
  const handleTextKeyDown = (e) => {
    if (e.ctrlKey && (e.key === "Enter" || e.key === "NumpadEnter")) {
      e.preventDefault();
      handlePost();
    }
  };

  // ✅ Drag & Drop upload
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.includes("video") ? "video" : "image",
      name: file.name,
      file,
    }));
    setMedia((prev) => [...prev, ...previews]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <motion.div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`relative bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-md border border-gray-100 transition-all ${
        compact ? "scale-[0.985] opacity-95" : "hover:shadow-xl"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-700">Create a Post</div>
        <div className="text-xs text-gray-400">Tip: Ctrl + Enter to post</div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleTextKeyDown}
          placeholder="Share something with your medical peers..."
          rows={text ? 4 : 2}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            onClick={() => setShowEmoji((s) => !s)}
            className="text-gray-500 hover:text-yellow-500 transition"
          >
            <Smile size={20} />
          </button>
        </div>
      </div>

      {/* Emoji Picker */}
      <div ref={pickerRef} className="relative">
        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.14 }}
              className="absolute z-50 mt-2"
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Media Previews */}
      <AnimatePresence>
        {media.length > 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {media.map((m, idx) => (
              <motion.div
                key={m.url}
                layout
                className="relative rounded-lg overflow-hidden bg-gray-50"
              >
                {m.type === "video" ? (
                  <video
                    src={m.url}
                    controls
                    className="w-full h-40 object-cover"
                    controlsList="nodownload"
                  />
                ) : (
                  <img
                    src={m.url}
                    alt={m.name || `upload-${idx}`}
                    className="w-full h-40 object-cover"
                    draggable={false}
                  />
                )}

                <button
                  onClick={() => removeMediaAt(idx)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
          >
            <Image size={16} /> Photo
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => videoInputRef.current.click()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition"
          >
            <Video size={16} /> Video
          </button>
          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() =>
              setText((prev) => prev + "\n📄 Sharing a medical article...")
            }
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition"
          >
            <FileText size={16} /> Article
          </button>
        </div>

        <div className="relative">
          <button
            onClick={handlePost}
            disabled={!text.trim() && media.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold transition ${
              text.trim() || media.length > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <UploadCloud size={16} />
            {postSuccess ? (
              <span className="flex items-center gap-1">
                <Sparkles size={14} /> Posted
              </span>
            ) : (
              "Post"
            )}
          </button>

          <AnimatePresence>
            {postSuccess && (
              <motion.span
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0 rounded-xl bg-blue-400/30 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        Drag & drop media or press{" "}
        <kbd className="px-1 py-0.5 bg-gray-100 rounded">Ctrl</kbd> +
        <kbd className="px-1 py-0.5 bg-gray-100 rounded">Enter</kbd> to post
      </p>
    </motion.div>
  );
}
