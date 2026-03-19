import { Menu, LogOut, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // 🔥 CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b bg-white">
      {/* LEFT */}
      <div className="flex items-center gap-2 md:gap-3">
        <Menu className="w-5 h-5 text-gray-700 cursor-pointer" />

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-7 h-7 md:w-8 md:h-8 bg-violet-600 rounded-md flex items-center justify-center text-white font-bold group-hover:scale-105 transition">
            E
          </div>

          <span className="font-semibold text-gray-800 text-sm md:text-base hidden sm:block group-hover:text-violet-600 transition">
            AI eBook Creator
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="relative flex items-center gap-2 md:gap-3"
        ref={dropdownRef}
      >
        {/* Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden 
  cursor-pointer hover:opacity-90"
        >
          {user?.avatar ? (
            <img
              src={`https://ai-ebook-creator-qkj3.onrender.com${user.avatar}`}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-violet-500 text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)}
            </div>
          )}
        </div>

        {/* Name */}
        <span
          className="text-sm text-gray-700 cursor-pointer hidden sm:block"
          onClick={() => setOpen(!open)}
        >
          {user?.name}
        </span>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white shadow-lg border rounded-lg py-2 z-50">
            {/* 🔥 PROFILE BUTTON */}
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm 
              text-red-500 hover:bg-red-50 cursor-pointer"
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
