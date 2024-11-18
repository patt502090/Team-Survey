import React, { useState, useEffect } from "react";
import { BiLoader } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

const HierarchicalFilterNotUse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    province: "",
    district: "",
    subDistrict: ""
  });

  const [options, setOptions] = useState({
    provinces: [
      "British Columbia",
      "Ontario",
      "Quebec",
      "Alberta",
      "Manitoba"
    ],
    districts: {
      "British Columbia": ["Vancouver", "Victoria", "Kelowna", "Surrey"],
      "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton"],
      "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau"],
      "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
      "Manitoba": ["Winnipeg", "Brandon", "Thompson", "Steinbach"]
    },
    subDistricts: {
      "Vancouver": ["Downtown", "Kitsilano", "Gastown", "Yaletown"],
      "Toronto": ["Downtown Core", "North York", "Scarborough", "Etobicoke"],
      "Montreal": ["Ville-Marie", "Plateau", "Mile End", "Griffintown"],
      "Calgary": ["Downtown", "Beltline", "Inglewood", "Bowness"]
    }
  });

  const handleFilterChange = async (level, value) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setFilters(prev => {
      const newFilters = { ...prev, [level]: value };
      
      // Reset child filters when parent changes
      if (level === "province") {
        newFilters.district = "";
        newFilters.subDistrict = "";
      } else if (level === "district") {
        newFilters.subDistrict = "";
      }
      
      return newFilters;
    });

    setIsLoading(false);
  };

  const clearFilters = () => {
    setFilters({
      province: "",
      district: "",
      subDistrict: ""
    });
  };

  const DropdownSelect = ({ label, value, onChange, options, disabled = false }) => (
    <div className="relative w-full md:w-64 mb-4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
          aria-label={`Select ${label}`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <MdKeyboardArrowDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Location Filter</h2>
          <button
            onClick={clearFilters}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
            aria-label="Clear all filters"
          >
            <IoMdClose className="w-4 h-4 mr-2" />
            Clear All
          </button>
        </div>

        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
              <BiLoader className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DropdownSelect
              label="Province"
              value={filters.province}
              onChange={(value) => handleFilterChange("province", value)}
              options={options.provinces}
            />

            <DropdownSelect
              label="District"
              value={filters.district}
              onChange={(value) => handleFilterChange("district", value)}
              options={filters.province ? options.districts[filters.province] : []}
              disabled={!filters.province}
            />

            <DropdownSelect
              label="Sub-District"
              value={filters.subDistrict}
              onChange={(value) => handleFilterChange("subDistrict", value)}
              options={
                filters.district ? options.subDistricts[filters.district] || [] : []
              }
              disabled={!filters.district}
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
              value && (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {key}: {value}
                </span>
              )
            ))}
            {!Object.values(filters).some(Boolean) && (
              <span className="text-gray-500 text-sm">No filters selected</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HierarchicalFilter;