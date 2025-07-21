import { motion } from "framer-motion";
import { FiCalendar, FiPlus, FiMenu, FiX, FiSun } from "react-icons/fi";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router"; // Updated imports

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Replaces useHistory
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FiCalendar className="mr-2" /> },
    {
      name: "Create Event",
      path: "/create",
      icon: <FiPlus className="mr-2" />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FiSun className="mr-2" />,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50"
    >
      {/* Glassmorphism background */}
      <div className="backdrop-blur-lg bg-gray-900/80 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")} // Changed to useNavigate
              className="flex-shrink-0 flex items-center cursor-pointer"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
                  <FiSun className="h-6 w-6 text-white" />
                </div>
              </div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="ml-3 text-xl font-bold text-white hidden md:block"
              >
                Event<span className="text-blue-400">AI</span>
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={`${
                        location.pathname === item.path
                          ? "bg-gray-800/50 text-white"
                          : "text-gray-300 hover:bg-gray-800/30 hover:text-white"
                      } px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* AI Status Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="ml-4 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full flex items-center text-xs font-medium"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                  AI Active
                </motion.div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`${isOpen ? "block" : "hidden"} md:hidden overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <motion.div key={item.name} whileTap={{ scale: 0.98 }}>
                <Link
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium flex items-center`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <div className="px-3 py-2 text-blue-400 rounded-md flex items-center text-sm font-medium">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              AI Categorization Active
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
