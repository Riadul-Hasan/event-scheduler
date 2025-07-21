import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiActivity, FiArrowRight, FiCode, FiCpu, FiZap } from "react-icons/fi";

const AICategorization = () => {
  const [inputText, setInputText] = useState("");
  const [predictedCategory, setPredictedCategory] = useState<
    "Work" | "Personal" | "Other"
  >();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  // Sample training data
  const categoryKeywords = {
    Work: [
      "meeting",
      "deadline",
      "project",
      "client",
      "presentation",
      "report",
      "conference",
    ],
    Personal: [
      "birthday",
      "family",
      "dinner",
      "vacation",
      "friends",
      "party",
      "gym",
    ],
    Other: ["reminder", "event", "appointment", "task", "note", "errand"],
  };

  // AI Categorization Logic (simulated)
  const categorizeText = (text: string) => {
    setIsAnalyzing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const lowerText = text.toLowerCase();

      const workMatches = categoryKeywords.Work.filter((keyword) =>
        lowerText.includes(keyword)
      ).length;

      const personalMatches = categoryKeywords.Personal.filter((keyword) =>
        lowerText.includes(keyword)
      ).length;

      if (workMatches > personalMatches && workMatches > 0) {
        setPredictedCategory("Work");
      } else if (personalMatches > workMatches && personalMatches > 0) {
        setPredictedCategory("Personal");
      } else {
        setPredictedCategory("Other");
      }

      setIsAnalyzing(false);
    }, 800);
  };

  useEffect(() => {
    if (inputText.length > 3) {
      categorizeText(inputText);
    } else {
      setPredictedCategory(undefined);
    }
  }, [inputText]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 overflow-hidden"
    >
      {/* Floating tech elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * Math.sin(i)],
              y: [0, 50 * Math.cos(i)],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className={`absolute ${
              i % 3 === 0
                ? "text-blue-500"
                : i % 2 === 0
                ? "text-purple-500"
                : "text-pink-500"
            }`}
            style={{
              fontSize: `${20 + i * 5}px`,
              top: `${i * 8}%`,
              left: `${i * 8}%`,
            }}
          >
            {i % 3 === 0 ? <FiCpu /> : i % 2 === 0 ? <FiCode /> : <FiZap />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 mb-6">
            <FiActivity className="text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-100">
              AI-Powered Intelligence
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Smart Event{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Categorization
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our advanced AI analyzes your event details to automatically
            classify them into relevant categories
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <FiCpu className="text-blue-400 mr-3" />
              Try It Yourself
            </h3>

            <div className="space-y-6">
              <div>
                <label htmlFor="ai-demo" className="block text-gray-400 mb-2">
                  Type an event description:
                </label>
                <textarea
                  id="ai-demo"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g. 'Team meeting tomorrow at 2pm'"
                  className="w-full bg-gray-900/70 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="h-32">
                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mb-3"
                      />
                      <span className="text-gray-400">
                        Analyzing with AI...
                      </span>
                    </motion.div>
                  ) : predictedCategory ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-6 rounded-xl ${
                        predictedCategory === "Work"
                          ? "bg-blue-900/30 border border-blue-700/50"
                          : predictedCategory === "Personal"
                          ? "bg-pink-900/30 border border-pink-700/50"
                          : "bg-purple-900/30 border border-purple-700/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">
                            Predicted Category
                          </h4>
                          <p className="text-gray-300">
                            The AI classified your event as:
                          </p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            predictedCategory === "Work"
                              ? "bg-blue-500/20 text-blue-300"
                              : predictedCategory === "Personal"
                              ? "bg-pink-500/20 text-pink-300"
                              : "bg-purple-500/20 text-purple-300"
                          }`}
                        >
                          {predictedCategory}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-gray-900/30 border border-gray-700/50 rounded-xl p-6 h-full flex items-center justify-center"
                    >
                      <p className="text-gray-500 text-center">
                        {inputText.length > 0
                          ? "Keep typing to see AI analysis..."
                          : "Enter text above to see AI categorization"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <FiCode className="text-purple-400 mr-3" />
              How Our AI Works
            </h3>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="p-6 bg-gray-800/50 rounded-xl border border-gray-700"
              >
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3">
                    1
                  </span>
                  Keyword Analysis
                </h4>
                <p className="text-gray-400">
                  The system scans your event title and notes for keywords that
                  indicate the category.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="p-6 bg-gray-800/50 rounded-xl border border-gray-700"
              >
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mr-3">
                    2
                  </span>
                  Context Understanding
                </h4>
                <p className="text-gray-400">
                  Our models evaluate word combinations to understand the
                  context beyond simple keywords.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="p-6 bg-gray-800/50 rounded-xl border border-gray-700"
              >
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mr-3">
                    3
                  </span>
                  Confidence Scoring
                </h4>
                <p className="text-gray-400">
                  Each prediction comes with a confidence score to ensure
                  accurate categorization.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowExamples(!showExamples)}
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
              >
                {showExamples ? "Hide" : "Show"} Keyword Examples
                <FiArrowRight
                  className={`ml-2 transition-transform ${
                    showExamples ? "rotate-90" : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {showExamples && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {Object.entries(categoryKeywords).map(
                        ([category, keywords]) => (
                          <div
                            key={category}
                            className={`p-4 rounded-lg ${
                              category === "Work"
                                ? "bg-blue-900/30 border border-blue-700/50"
                                : category === "Personal"
                                ? "bg-pink-900/30 border border-pink-700/50"
                                : "bg-purple-900/30 border border-purple-700/50"
                            }`}
                          >
                            <h5 className="font-medium text-white mb-2">
                              {category} Keywords
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {keywords.slice(0, 5).map((keyword) => (
                                <span
                                  key={keyword}
                                  className="text-xs px-2 py-1 bg-white/10 text-white rounded"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AICategorization;
