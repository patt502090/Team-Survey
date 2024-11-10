import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const FilterTeamCustom = () => {
  const leagues = ["All", "TeamA", "TeamB", "TeamC"];
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
    setIsDropdownOpen(false);
    setError("");
  };

  return (
    <div className="min-h-min bg-gray-100 p-4">
      <div className={`mx-auto ${isMobile ? "max-w-[200px]" : "max-w-sm"}`}>
        <div className="mb-4 relative" role="combobox" aria-expanded={isDropdownOpen} aria-haspopup="listbox">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full bg-white p-3 rounded-md shadow-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isMobile ? "text-xs" : "text-sm"}`}
            aria-label="Select league filter"
          >
            <span className="text-gray-700">{selectedLeague}</span>
            <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? "transform rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className={`absolute w-full mt-1 bg-white rounded-md shadow-lg z-10 ${isMobile ? "text-xs" : "text-sm"}`} role="listbox">
              {leagues.map((league) => (
                <button
                  key={league}
                  onClick={() => handleLeagueSelect(league)}
                  className={`w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors duration-200
                    ${selectedLeague === league ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
                  role="option"
                  aria-selected={selectedLeague === league}
                >
                  {league}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className={`mb-4 p-3 bg-red-100 text-red-700 rounded-md ${isMobile ? "text-xs" : "text-sm"}`} role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterTeamCustom;