import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  FiTag,
  FiTrash2,
  FiArchive,
  FiSearch,
  FiCalendar,
  FiClock,
  FiCpu,
  FiZap,
  FiLayers,
} from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
};

const categoryColors: Record<Event["category"], string> = {
  Work: "text-indigo-400",
  Personal: "text-pink-400",
  Other: "text-purple-400",
};

const API_URL = import.meta.env.VITE_API_URL;

const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | Event["category"]>("All");
  const [search, setSearch] = useState("");

  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const rotate = useMotionValue(0);

  const x1 = useTransform(bgX, [0, 100], [0, -20]);
  const x2 = useTransform(bgY, [0, 100], [0, 40]);
  const y1 = useTransform(bgY, [0, 100], [0, -30]);
  const y2 = useTransform(bgX, [0, 100], [0, 50]);

  useEffect(() => {
    const animateBg = async () => {
      while (true) {
        await animate(bgX, 100, { duration: 30, ease: "linear" });
        await animate(bgX, 0, { duration: 0 });
        await animate(bgY, 100, { duration: 25, ease: "linear" });
        await animate(bgY, 0, { duration: 0 });
        await animate(rotate, 360, { duration: 40, ease: "linear" });
        await animate(rotate, 0, { duration: 0 });
      }
    };
    animateBg();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/events`);
        const mapped: Event[] = response.data.map((e: any) => ({
          id: e._id,
          title: e.title,
          date: e.date,
          time: e.time,
          notes: e.notes,
          category: e.category ?? "Other",
          archived: e.archived ?? false,
        }));
        mapped.sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`).getTime() -
            new Date(`${b.date}T${b.time}`).getTime()
        );
        setEvents(mapped);
      } catch {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const deleteEvent = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/events/${id}`);
        setEvents((prev) => prev.filter((e) => e.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your event has been deleted.",
          icon: "success",
        });
      } catch {
        setError("Failed to delete event.");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete event",
        });
      }
    }
  };

  const archiveEvent = async (id: string) => {
    try {
      await axios.put(`${API_URL}/events/${id}`, { archived: true });
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, archived: true } : e))
      );
      Swal.fire({
        title: "Archived!",
        text: "Event has been archived.",
        icon: "success",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#6366f1",
      });
    } catch {
      setError("Failed to archive event.");
      Swal.fire({
        title: "Error",
        text: "Failed to archive event.",
        icon: "error",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  const filteredEvents = events.filter((e) => {
    if (filter !== "All" && e.category !== filter) return false;
    if (search.trim() !== "") {
      return `${e.title} ${e.notes ?? ""}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    }
    return true;
  });

  return (
    <div
      className="min-h-screen py-20 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden relative"
      onMouseMove={(e) => {
        bgX.set((e.clientX / window.innerWidth) * 100);
        bgY.set((e.clientY / window.innerHeight) * 100);
      }}
    >
      {/* Animated Backgrounds */}
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

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-indigo-500/20 text-6xl"
      >
        <FiCpu />
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0] }}
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Your <span className="text-indigo-400">Events</span>
          </h1>
          <p className="text-slate-400">
            Manage all your scheduled events with ease
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["All", "Work", "Personal", "Other"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  filter === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {loading && (
          <div className="text-center text-slate-400">Loading events...</div>
        )}
        {error && <div className="text-center text-red-400">{error}</div>}

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center text-slate-400 mt-10">
            No events found.
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-xl bg-slate-700/50 border border-slate-500/30 shadow hover:shadow-lg transition ${
                event.archived ? "opacity-60" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <FiTag className={`${categoryColors[event.category]}`} />
                  <span className="text-slate-200 text-sm">
                    {event.category} {event.archived && "(Archived)"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {!event.archived && (
                    <button
                      onClick={() => archiveEvent(event.id)}
                      title="Archive"
                      className="text-slate-300 hover:text-indigo-400"
                    >
                      <FiArchive />
                    </button>
                  )}
                  <button
                    onClick={() => deleteEvent(event.id)}
                    title="Delete"
                    className="text-slate-300 hover:text-red-400"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-slate-100 mb-1">
                {event.title}
              </h2>
              <div className="flex items-center gap-3 text-slate-300 text-sm mb-1">
                <FiCalendar />
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <FiClock />
                <span>{event.time}</span>
              </div>
              {event.notes && (
                <p className="text-slate-300 text-sm mt-1">{event.notes}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
