import { Link } from "react-router-dom";
import { LogOut, User, LayoutDashboard } from "lucide-react";

function ProfileDropdown({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
}) {
  return (
    <div
      className="relative"
      onMouseEnter={(e) => onToggle(e)}
      onMouseLeave={(e) => onToggle(e)}
    >
      {/* Avatar */}
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-violet-500 text-white font-semibold cursor-pointer">
        {companyName?.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold text-gray-900">{companyName}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>

          {/* Links */}
          <div className="py-2">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t">
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
