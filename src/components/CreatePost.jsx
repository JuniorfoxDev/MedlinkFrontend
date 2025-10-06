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

/**
 * CreatePost.jsx
 * - fixed UI bugs:
 *   - properly declared refs
 *   - revokeObjectURL to prevent memory leaks
 *   - emoji picker anchored inside relative container
 *   - keyboard shortcut handled on textarea
 *   - drag/drop prevents default & propagation
 *   - responsive preview grid
 */

export default function CreatePost() {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]); // { url, type, name }
  const [showEmoji, setShowEmoji] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [compact, setCompact] = useState(false);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const pickerRef = useRef(null); // anchor container
  const mountedRef = useRef(true);

  // Compact Mode on Scroll
  useEffect(() => {
    const handleScroll = () => setCompact(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // track mount for cleanup
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // revoke created object URLs on unmount
      media.forEach((m) => {
        try {
          URL.revokeObjectURL(m.url);
        } catch (e) {}
      });
    };
  }, []); // eslint-disable-line

  // create previews and store file name & type
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.includes("video") ? "video" : "image",
      name: file.name,
    }));

    setMedia((prev) => [...prev, ...previews]);

    // reset input value so same file re-upload works if needed
    e.target.value = "";
  };

  // remove single preview and revoke URL
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

  // emoji handler
  const onEmojiClick = (emojiData) => {
    // emoji-picker-react passes object with `emoji`
    const emoji = emojiData?.emoji ?? "";
    setText((prev) => prev + emoji);
  };

  // handle ctrl + enter post (textarea keydown)
  const handleTextKeyDown = (e) => {
    if (e.ctrlKey && (e.key === "Enter" || e.key === "NumpadEnter")) {
      e.preventDefault();
      handlePost();
    }
  };

  // post logic (placeholder)
  const handlePost = () => {
    if (!text.trim() && media.length === 0) return;

    setPostSuccess(true);

    // fake delay to show animation (replace with actual API call)
    setTimeout(() => {
      if (!mountedRef.current) return;
      // cleanup previews and reset
      media.forEach((m) => {
        try {
          URL.revokeObjectURL(m.url);
        } catch (e) {}
      });
      setText("");
      setMedia([]);
      setPostSuccess(false);
    }, 1200);
  };

  // drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.includes("video") ? "video" : "image",
      name: file.name,
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
      {/* header / title (subtle) */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-700">Create a post</div>
        <div className="text-xs text-gray-400">Tip: Ctrl + Enter to post</div>
      </div>

      {/* textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleTextKeyDown}
          placeholder="Share something with your medical peers..."
          rows={text ? 4 : 2}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          aria-label="Create post text"
        />
        {/* emoji anchor */}
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            onClick={() => setShowEmoji((s) => !s)}
            aria-label="Emoji picker"
            className="flex items-center gap-2 text-gray-500 hover:text-yellow-500 p-1 rounded-md"
            title="Add emoji"
          >
            <Smile size={18} />
          </button>
        </div>
      </div>

      {/* emoji picker positioned using a relative container */}
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

      {/* media previews */}
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
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
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
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-90 hover:bg-black/70 transition"
                  aria-label={`Remove media ${idx + 1}`}
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* actions */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
            type="button"
            aria-label="Upload images"
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
            onClick={() =>
              videoInputRef.current && videoInputRef.current.click()
            }
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition"
            type="button"
            aria-label="Upload videos"
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
            type="button"
            aria-label="Add article text"
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
            aria-disabled={!text.trim() && media.length === 0}
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

          {/* ripple */}
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
        Drag & drop images/videos here or press{" "}
        <kbd className="px-1 py-0.5 bg-gray-100 rounded">Ctrl</kbd> +
        <kbd className="px-1 py-0.5 bg-gray-100 rounded">Enter</kbd> to post
      </p>
    </motion.div>
  );
}
