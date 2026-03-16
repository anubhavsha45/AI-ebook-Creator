import { Menu, LogOut, User } from "lucide-react";
import { useState } from "react";

const DashboardNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b bg-white">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Menu className="w-5 h-5 text-gray-700 cursor-pointer" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-md flex items-center justify-center text-white font-bold">
            E
          </div>

          <span className="font-semibold text-gray-800">AI eBook Creator</span>
        </div>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-3">
        {/* Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-violet-500 text-white flex items-center justify-center font-semibold cursor-pointer hover:opacity-90"
        >
          {user?.name?.charAt(0)}
        </div>

        <span
          className="text-sm text-gray-700 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {user?.name}
        </span>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white shadow-lg border rounded-lg py-2">
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
              <User className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
