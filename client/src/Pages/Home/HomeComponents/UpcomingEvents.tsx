import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiClock, FiArrowRight, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  category: "Work" | "Personal" | "Other";
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          "http://localhost:3000/events/upcoming"
        );
        setEvents(response.data || []);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-16 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * Math.sin(i)],
              y: [0, 50 * Math.cos(i)],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? "bg-blue-500/10"
                : i % 2 === 0
                ? "bg-purple-500/10"
                : "bg-pink-500/10"
            }`}
            style={{
              width: `${100 + i * 20}px`,
              height: `${100 + i * 20}px`,
              top: `${i * 10}%`,
              left: `${i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header with animated underline */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Upcoming Events
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Smartly categorized and beautifully organized
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-6 mx-auto max-w-md"
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  y: 0,
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.2,
                  },
                }}
                className="h-64 bg-gray-800/50 rounded-2xl backdrop-blur-sm"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center max-w-2xl mx-auto border border-gray-700"
          >
            <FiCalendar className="text-5xl text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-3">
              No Upcoming Events
            </h3>
            <p className="text-gray-400 mb-8">
              You don't have any events scheduled yet. Create your first event
              to get started!
            </p>
            <Link to="/events/create">
              <motion.button
                whileHover={{
                  y: -3,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium flex items-center mx-auto"
              >
                <FiPlus className="mr-2" />
                Create Event
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {events.map((event, index) => (
                  <motion.div
                    key={event._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.1,
                    }}
                    whileHover={{ y: -10 }}
                    className={`rounded-2xl overflow-hidden backdrop-blur-sm border ${
                      event.category === "Work"
                        ? "bg-blue-900/20 border-blue-700/30"
                        : event.category === "Personal"
                        ? "bg-pink-900/20 border-pink-700/30"
                        : "bg-purple-900/20 border-purple-700/30"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {event.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.category === "Work"
                              ? "bg-blue-500/20 text-blue-300"
                              : event.category === "Personal"
                              ? "bg-pink-500/20 text-pink-300"
                              : "bg-purple-500/20 text-purple-300"
                          }`}
                        >
                          {event.category}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-300 mb-6">
                        <FiClock className="mr-3 text-blue-400" />
                        <span>
                          {formatDate(event.date)} • {event.time}
                        </span>
                      </div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center text-blue-400 font-medium"
                      >
                        <Link
                          to={`/events/${event._id}`}
                          className="flex items-center"
                        >
                          View Details <FiArrowRight className="ml-2" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center mt-16"
            >
              <Link to="/events">
                <motion.button
                  whileHover={{
                    y: -3,
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium flex items-center"
                >
                  View All Events <FiArrowRight className="ml-2" />
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default UpcomingEvents;
