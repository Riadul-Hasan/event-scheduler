import { IoTimeOutline, IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header with event-themed gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <IoTimeOutline className="text-white text-xl" />
            <h2 className="text-white text-xl font-semibold">
              Event Not Scheduled
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <IoWarningOutline
              size={80}
              className="text-amber-500 animate-pulse"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold">
              404
            </div>
          </div>

          <div className="text-center space-y-2 mb-6">
            <h3 className="text-xl font-bold text-gray-800">Page Not Found</h3>
            <p className="text-gray-600">
              We couldn't find the event or page you're looking for!
            </p>
            <p className="text-sm text-amber-700 font-medium mt-2">
              <span className="bg-amber-100 px-2 py-1 rounded">
                "No routes found"
              </span>
            </p>
          </div>

          <Link
            to="/"
            className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-center shadow-sm hover:shadow-md"
          >
            Back to Event Calendar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
