import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiCalendar,
  FiClock,
  FiFileText,
  FiPlus,
  FiTag,
  FiCpu,
  FiZap,
  FiLayers,
} from "react-icons/fi";

interface EventResponse {
  category: "Work" | "Personal" | "Other";
}

interface FormData {
  title: string;
  date: string;
  time: string;
  notes: string;
}

const AddEvent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [serverCategory, setServerCategory] = useState<
    "Work" | "Personal" | "Other" | null
  >(null);

  // Background animations
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const rotate = useMotionValue(0);

  console.log(activeField);
  const x1 = useTransform(bgX, [0, 100], [0, -20]);
  const x2 = useTransform(bgY, [0, 100], [0, 40]);
  const y1 = useTransform(bgY, [0, 100], [0, -30]);
  const y2 = useTransform(bgX, [0, 100], [0, 50]);

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await animate(bgX, 100, { duration: 30, ease: "linear" });
        await animate(bgX, 0, { duration: 0 });
        await animate(bgY, 100, { duration: 25, ease: "linear" });
        await animate(bgY, 0, { duration: 0 });
        await animate(rotate, 360, { duration: 40, ease: "linear" });
        await animate(rotate, 0, { duration: 0 });
      }
    };
    sequence();
  }, [bgX, bgY, rotate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date || !formData.time) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "warning",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<EventResponse>(
        "https://event-scheduler-server-gamma.vercel.app/events",
        {
          title: formData.title,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
        }
      );

      setServerCategory(response.data.category);

      await Swal.fire({
        title: "Success!",
        text: `Your ${response.data.category} event has been scheduled`,
        icon: "success",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#6366f1",
      });

      // Reset form
      setFormData({
        title: "",
        date: "",
        time: "",
        notes: "",
      });
      setServerCategory(null);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to schedule event. Please try again.",
        icon: "error",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-16 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden relative"
      onMouseMove={(e) => {
        bgX.set((e.clientX / window.innerWidth) * 100);
        bgY.set((e.clientY / window.innerHeight) * 100);
      }}
    >
      {/* Animated background elements */}
      <motion.div
        style={{ x: x1, y: y1, rotate }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-900/20 blur-3xl -z-10"
      />
      <motion.div
        style={{ x: x2, y: y1, rotate }}
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-900/15 blur-3xl -z-10"
      />
      <motion.div
        style={{ x: x1, y: y2, rotate }}
        className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-blue-900/10 blur-3xl -z-10"
      />

      {/* Floating tech icons */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-indigo-500/20 text-6xl"
      >
        <FiCpu />
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 right-20 text-purple-500/15 text-7xl"
      >
        <FiLayers />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0, 15, 0], x: [0, 20, 0, -20, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/2 left-1/4 text-blue-500/10 text-5xl"
      >
        <FiZap />
      </motion.div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-2 bg-indigo-900/30 border border-indigo-700/50 rounded-full mb-6">
            <FiCpu className="text-indigo-400 mr-2" />
            <span className="text-indigo-300 font-medium">
              AI-Powered Scheduling
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Event
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Let our intelligent system help you organize your schedule
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Event Title <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <FiFileText />
                    </div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      onFocus={() => setActiveField("title")}
                      onBlur={() => setActiveField(null)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Team meeting, Birthday party..."
                      required
                    />
                  </div>
                </div>

                {/* Date and Time Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Date <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <FiCalendar />
                      </div>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        onFocus={() => setActiveField("date")}
                        onBlur={() => setActiveField(null)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Time <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <FiClock />
                      </div>
                      <input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        onFocus={() => setActiveField("time")}
                        onBlur={() => setActiveField(null)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Notes Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    onFocus={() => setActiveField("notes")}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Additional details..."
                    rows={3}
                  />
                </div>

                {/* Category Display (after submission) */}
                {serverCategory && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg border ${
                      serverCategory === "Work"
                        ? "bg-indigo-900/20 border-indigo-700/30"
                        : serverCategory === "Personal"
                        ? "bg-pink-900/20 border-pink-700/30"
                        : "bg-purple-900/20 border-purple-700/30"
                    }`}
                  >
                    <div className="flex items-center">
                      <FiTag
                        className={`mr-3 ${
                          serverCategory === "Work"
                            ? "text-indigo-400"
                            : serverCategory === "Personal"
                            ? "text-pink-400"
                            : "text-purple-400"
                        }`}
                      />
                      <div>
                        <p className="text-sm text-slate-400">Category</p>
                        <p className="font-medium text-white">
                          {serverCategory}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      Create Event
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
