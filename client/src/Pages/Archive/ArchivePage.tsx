import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  FiArchive,
  FiTrash2,
  FiClock,
  FiCalendar,
  FiTag,
  FiCpu,
  FiZap,
  FiLayers,
} from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";

interface ArchivedEvent {
  _id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
  createdAt: string;
}

const categoryColors = {
  Work: "text-indigo-400",
  Personal: "text-pink-400",
  Other: "text-purple-400",
};

const categoryBg = {
  Work: "bg-indigo-900/20 border-indigo-700/30",
  Personal: "bg-pink-900/20 border-pink-700/30",
  Other: "bg-purple-900/20 border-purple-700/30",
};

const ArchivePage: React.FC = () => {
  const [archivedEvents, setArchivedEvents] = useState<ArchivedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Background animations (matching your theme)
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const rotate = useMotionValue(0);

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

  useEffect(() => {
    const fetchArchivedEvents = async () => {
      setLoading(true); // ✅ Ensure loading state is set

      try {
        // ✅ Correct API endpoint
        const response = await axios.get(
          "https://event-scheduler-server-gamma.vercel.app/events/archived"
        );

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid data format received");
        }

        // ✅ Sort by available fields
        const sortedEvents = response.data.sort(
          (a: ArchivedEvent, b: ArchivedEvent) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
            const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
            return dateTimeB - dateTimeA; // descending
          }
        );

        setArchivedEvents(sortedEvents);
      } catch (err) {
        console.error("Error fetching archived events:", err);
        setError("Failed to load archived events");
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://event-scheduler-server-gamma.vercel.app/events/${id}`
      );
      setArchivedEvents((prev) => prev.filter((event) => event._id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Event has been permanently deleted.",
        icon: "success",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#6366f1",
      });
    } catch (err) {
      console.error("Error deleting event:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to delete event.",
        icon: "error",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#6366f1",
      });
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
            <FiArchive className="text-indigo-400 mr-2" />
            <span className="text-indigo-300 font-medium">Archived Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Event{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Archive
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Review and manage your archived events
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-red-300 text-center">
                {error}
              </div>
            ) : archivedEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">
                  No archived events found
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {archivedEvents.map((event) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-5 rounded-xl ${
                      categoryBg[event.category]
                    } border border-slate-700/50 hover:border-slate-600/50 transition-all`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FiTag
                          className={`mr-2 ${categoryColors[event.category]}`}
                        />
                        <span className="text-sm text-slate-400">
                          {event.category} • Archived
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(event._id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete permanently"
                      >
                        <FiTrash2 />
                      </motion.button>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">
                      {event.title}
                    </h3>

                    <div className="flex items-center text-slate-400 text-sm mb-3">
                      <FiCalendar className="mr-2" />
                      <span className="mr-4">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <FiClock className="mr-2" />
                      <span>{event.time}</span>
                    </div>

                    {event.notes && (
                      <p className="text-slate-300 text-sm">{event.notes}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArchivePage;
