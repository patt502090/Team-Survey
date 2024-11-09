import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
const AppBarCustom = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const profileOptions = [
    { id: 1, label: "My Profile", link: "#" },
    { id: 3, label: "Logout", link: "#" },
  ];

  return (
    <header className="relative">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <QueryStatsIcon/>
              <span className="ml-2 text-xl font-semibold text-gray-800">Team Survey</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e:any) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/32";
                    }}
                  />
                  <FiUser className="h-5 w-5 text-gray-600" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      {profileOptions.map((option) => (
                        <a
                          key={option.id}
                          href={option.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          {option.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppBarCustom;