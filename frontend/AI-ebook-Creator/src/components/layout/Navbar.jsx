import React, { useState, useEffect, useRef } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  // ✅ FIXED OUTSIDE CLICK (ONLY WHEN OPEN)
  useEffect(() => {
    if (!profileDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>

            <span className="text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block">
              AI eBook Creator
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-50"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm text-gray-600 hover:text-violet-600 rounded-lg hover:bg-violet-50"
                >
                  Dashboard
                </Link>

                {/* 🔥 PROFILE */}
                <div ref={dropdownRef} className="relative">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileDropdownOpen((prev) => !prev);
                    }}
                    className="cursor-pointer"
                  >
                    {/* ✅ AVATAR FIX */}
                    {user?.avatar ? (
                      <img
                        src={`https://ai-ebook-creator-qkj3.onrender.com${user.avatar}`}
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-violet-500 text-white flex items-center justify-center font-semibold">
                        {user?.name?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* DROPDOWN */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50">
                      <div className="p-3 border-b">
                        <p className="font-semibold text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm text-white bg-violet-600 rounded-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden mt-2 pb-4 border-t pt-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                {link.name}
              </a>
            ))}

            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
