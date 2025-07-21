import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiPieChart,
  FiArchive,
  FiCpu,
  FiZap,
  FiLayers,
} from "react-icons/fi";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface StatsData {
  totalEvents: number;
  categoryDistribution: {
    Work: number;
    Personal: number;
    Other: number;
  };
  archivedCount: number;
}

const COLORS = ["#818cf8", "#ec4899", "#a855f7"]; // Indigo, Pink, Purple

const QuickStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events/stats");
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = stats
    ? [
        { name: "Work", value: stats.categoryDistribution.Work },
        { name: "Personal", value: stats.categoryDistribution.Personal },
        { name: "Other", value: stats.categoryDistribution.Other },
      ]
    : [];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 shadow-xl p-6">
      {/* Background elements matching your theme */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-5 left-5 text-indigo-500/10 text-5xl"
      >
        <FiCpu />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-5 right-5 text-purple-500/10 text-6xl"
      >
        <FiLayers />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0, 10, 0], x: [0, 15, 0, -15, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-1/4 text-blue-500/10 text-4xl"
      >
        <FiZap />
      </motion.div>

      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <FiPieChart className="mr-2 text-indigo-400" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Quick Stats
        </span>
      </h3>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-red-300 text-center">
          {error}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Events Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center"
          >
            <div className="bg-indigo-900/20 p-3 rounded-full mb-3">
              <FiCalendar className="text-indigo-400 text-2xl" />
            </div>
            <h4 className="text-slate-400 text-sm mb-1">Total Events</h4>
            <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
          </motion.div>

          {/* Category Distribution Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center"
          >
            <div className="bg-pink-900/20 p-3 rounded-full mb-3">
              <FiPieChart className="text-pink-400 text-2xl" />
            </div>
            <h4 className="text-slate-400 text-sm mb-1">
              Category Distribution
            </h4>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-3 mt-1">
              {chartData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-xs text-slate-400">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Archived Events Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center"
          >
            <div className="bg-purple-900/20 p-3 rounded-full mb-3">
              <FiArchive className="text-purple-400 text-2xl" />
            </div>
            <h4 className="text-slate-400 text-sm mb-1">Archived Events</h4>
            <p className="text-3xl font-bold text-white">
              {stats.archivedCount}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round((stats.archivedCount / stats.totalEvents) * 100)}% of
              total
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuickStats;
