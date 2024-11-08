import { useState, useEffect } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const FilterList = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isSubDistrictOpen, setIsSubDistrictOpen] = useState(false);

  // Sample data
  const provinces = ["New York", "California", "Texas"];
  const districts = {
    "New York": ["Manhattan", "Brooklyn", "Queens"],
    "California": ["Los Angeles", "San Francisco", "San Diego"],
    "Texas": ["Houston", "Dallas", "Austin"]
  };
  const subDistricts = {
    "Manhattan": ["Upper East Side", "Lower Manhattan", "Midtown"],
    "Brooklyn": ["Williamsburg", "DUMBO", "Park Slope"],
    "Queens": ["Astoria", "Long Island City", "Flushing"],
    "Los Angeles": ["Hollywood", "Downtown LA", "Venice"],
    "San Francisco": ["Mission District", "SoMa", "North Beach"],
    "San Diego": ["Gaslamp Quarter", "La Jolla", "Pacific Beach"],
    "Houston": ["Downtown", "Midtown", "Museum District"],
    "Dallas": ["Uptown", "Deep Ellum", "Bishop Arts"],
    "Austin": ["Downtown", "South Congress", "East Austin"]
  };

  const handleClear = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedSubDistrict("");
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsProvinceOpen(false);
      setIsDistrictOpen(false);
      setIsSubDistrictOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Location Filter</h2>

        {/* Selected Filters Display */}
        {(selectedProvince || selectedDistrict || selectedSubDistrict) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-gray-600 font-medium">Selected Filters:</span>
            {selectedProvince && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedProvince}
              </span>
            )}
            {selectedDistrict && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedDistrict}
              </span>
            )}
            {selectedSubDistrict && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedSubDistrict}
              </span>
            )}
            <button
              onClick={handleClear}
              className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium"
              aria-label="Clear filters"
            >
              <FiX className="w-4 h-4" />
              Clear
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Province Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={() => setIsProvinceOpen(!isProvinceOpen)}
              className="w-full px-4 py-2 text-left bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
              aria-label="Select Province"
              aria-expanded={isProvinceOpen}
              aria-haspopup="listbox"
            >
              <span className={selectedProvince ? "text-gray-900" : "text-gray-500"}>
                {selectedProvince || "Select Province"}
              </span>
              <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${isProvinceOpen ? "transform rotate-180" : ""}`} />
            </button>
            {isProvinceOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {provinces.map((province) => (
                  <button
                    key={province}
                    onClick={() => {
                      setSelectedProvince(province);
                      setSelectedDistrict("");
                      setSelectedSubDistrict("");
                      setIsProvinceOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 ${
                      selectedProvince === province ? "bg-blue-100 text-blue-800" : "text-gray-800"
                    }`}
                    role="option"
                    aria-selected={selectedProvince === province}
                  >
                    {province}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* District Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={() => selectedProvince && setIsDistrictOpen(!isDistrictOpen)}
              className={`w-full px-4 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between ${
                selectedProvince ? "bg-gray-50 border-gray-300" : "bg-gray-100 border-gray-200 cursor-not-allowed"
              }`}
              disabled={!selectedProvince}
              aria-label="Select District"
              aria-expanded={isDistrictOpen}
              aria-haspopup="listbox"
            >
              <span className={selectedDistrict ? "text-gray-900" : "text-gray-500"}>
                {selectedDistrict || "Select District"}
              </span>
              <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDistrictOpen ? "transform rotate-180" : ""}`} />
            </button>
            {isDistrictOpen && selectedProvince && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {districts[selectedProvince].map((district) => (
                  <button
                    key={district}
                    onClick={() => {
                      setSelectedDistrict(district);
                      setSelectedSubDistrict("");
                      setIsDistrictOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 ${
                      selectedDistrict === district ? "bg-blue-100 text-blue-800" : "text-gray-800"
                    }`}
                    role="option"
                    aria-selected={selectedDistrict === district}
                  >
                    {district}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sub-District Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={() => selectedDistrict && setIsSubDistrictOpen(!isSubDistrictOpen)}
              className={`w-full px-4 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between ${
                selectedDistrict ? "bg-gray-50 border-gray-300" : "bg-gray-100 border-gray-200 cursor-not-allowed"
              }`}
              disabled={!selectedDistrict}
              aria-label="Select Sub-District"
              aria-expanded={isSubDistrictOpen}
              aria-haspopup="listbox"
            >
              <span className={selectedSubDistrict ? "text-gray-900" : "text-gray-500"}>
                {selectedSubDistrict || "Select Sub-District"}
              </span>
              <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${isSubDistrictOpen ? "transform rotate-180" : ""}`} />
            </button>
            {isSubDistrictOpen && selectedDistrict && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {subDistricts[selectedDistrict].map((subDistrict) => (
                  <button
                    key={subDistrict}
                    onClick={() => {
                      setSelectedSubDistrict(subDistrict);
                      setIsSubDistrictOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 ${
                      selectedSubDistrict === subDistrict ? "bg-blue-100 text-blue-800" : "text-gray-800"
                    }`}
                    role="option"
                    aria-selected={selectedSubDistrict === subDistrict}
                  >
                    {subDistrict}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterList;