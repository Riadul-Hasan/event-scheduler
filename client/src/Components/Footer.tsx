import { FaTwitter, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300  py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Routes */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="/how-it-works"
            className="text-white hover:text-blue-400 text-sm font-medium"
          >
            How It Works
          </a>
          <a
            href="/categories"
            className="text-white hover:text-blue-400 text-sm font-medium"
          >
            Categories
          </a>
          <a
            href="/privacy"
            className="text-white hover:text-blue-400 text-sm font-medium"
          >
            Privacy
          </a>
        </div>

        {/* Contact */}
        <div className="flex space-x-4">
          <a
            href="mailto:support@smartevent.ai"
            className="text-gray-400 hover:text-white"
          >
            <FaEnvelope size={18} />
          </a>
          <a href="tel:+1234567890" className="text-gray-400 hover:text-white">
            <FaPhoneAlt size={18} />
          </a>
          <a
            href="https://twitter.com/EventAI"
            className="text-gray-400 hover:text-white"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-gray-800 text-xs text-center text-gray-500">
        © {new Date().getFullYear()} Smart Event AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
