import { motion, useAnimation } from "framer-motion";
import { FiCalendar, FiPlus, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const EVENT_TITLES = [
  "Team Sync Meeting",
  "Lunch with Sarah",
  "Project Deadline",
  "Gym Session",
  "Client Call",
];

const EVENT_CATEGORIES = [
  { name: "Work", color: "bg-blue-500" },
  { name: "Personal", color: "bg-pink-500" },
  { name: "Other", color: "bg-purple-500" },
];

export default function HeroSection() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const cycleEvents = () => {
      controls.start({
        opacity: [1, 0, 0, 1],
        y: [0, 20, -20, 0],
        transition: { duration: 1.5 },
      });

      setTimeout(() => {
        setCurrentEventIndex((prev) => (prev + 1) % EVENT_TITLES.length);
      }, 750);
    };

    const interval = setInterval(cycleEvents, 3000);
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * Math.sin(i)],
              y: [0, 50 * Math.cos(i)],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? "bg-blue-500/20"
                : i % 2 === 0
                ? "bg-purple-500/20"
                : "bg-pink-500/20"
            }`}
            style={{
              width: `${50 + i * 10}px`,
              height: `${50 + i * 10}px`,
              top: `${10 + i * 7}%`,
              left: `${5 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-blue-100">
                  AI-Powered Event Management
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform How You <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Schedule Life
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 mb-10 max-w-xl"
              >
                Intelligent categorization, beautiful organization, and
                effortless scheduling all in one place.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/addEvents">
                  <motion.button
                    whileHover={{
                      y: -3,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center transition-all"
                  >
                    <FiPlus className="mr-2" />
                    Create New Event
                  </motion.button>
                </Link>

                <Link to="/archive">
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center transition-all"
                  >
                    Archived Ones
                    <FiChevronRight className="ml-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right animated demo */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-lg"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
                <div className="flex gap-2 mb-6">
                  {EVENT_CATEGORIES.map((category) => (
                    <span
                      key={category.name}
                      className={`${category.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <motion.div animate={controls} className="space-y-6">
                  <div>
                    <div className="h-5 w-3/4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                    <div>
                      <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-gray-700 rounded"></div>
                    </div>
                  </div>

                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-1">
                      {EVENT_TITLES[currentEventIndex]}
                    </h3>
                    <p className="text-gray-400">Automatically categorized</p>
                  </div>
                </motion.div>

                <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between">
                  <div className="h-3 w-16 bg-gray-700 rounded"></div>
                  <div className="h-8 w-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <FiCalendar className="text-blue-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating animated elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-10 text-blue-400/30"
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6947 13.7002H15.7037M15.6947 16.7002H15.7037M11.9955 13.7002H12.0045M11.9955 16.7002H12.0045M8.29431 13.7002H8.30329M8.29431 16.7002H8.30329"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
