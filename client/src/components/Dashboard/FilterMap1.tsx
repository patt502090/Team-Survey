import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdClear } from "react-icons/md";

type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
};

const FilterListCustom: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [isProvinceOpen, setIsProvinceOpen] = useState<boolean>(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState<boolean>(false);
  const [isSubDistrictOpen, setIsSubDistrictOpen] = useState<boolean>(false);

  // Dummy data for demonstration
  const provinces = ["Province A", "Province B", "Province C"];
  const districts: Record<string, string[]> = {
    "Province A": ["District A1", "District A2", "District A3"],
    "Province B": ["District B1", "District B2", "District B3"],
    "Province C": ["District C1", "District C2", "District C3"],
  };
  const subDistricts: Record<string, string[]> = {
    "District A1": ["Sub-District A1.1", "Sub-District A1.2"],
    "District A2": ["Sub-District A2.1", "Sub-District A2.2"],
    "District A3": ["Sub-District A3.1", "Sub-District A3.2"],
    "District B1": ["Sub-District B1.1", "Sub-District B1.2"],
    "District B2": ["Sub-District B2.1", "Sub-District B2.2"],
    "District B3": ["Sub-District B3.1", "Sub-District B3.2"],
    "District C1": ["Sub-District C1.1", "Sub-District C1.2"],
    "District C2": ["Sub-District C2.1", "Sub-District C2.2"],
    "District C3": ["Sub-District C3.1", "Sub-District C3.2"],
  };

  const handleClearFilters = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedSubDistrict("");
  };

  useEffect(() => {
    if (!selectedProvince) {
      setSelectedDistrict("");
      setSelectedSubDistrict("");
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedDistrict) {
      setSelectedSubDistrict("");
    }
  }, [selectedDistrict]);

  const Dropdown: React.FC<DropdownProps> = ({
    label,
    options,
    value,
    onChange,
    isOpen,
    setIsOpen,
    disabled = false,
  }) => {
    return (
      <div className="relative mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full p-3 text-left bg-white border rounded-lg shadow-sm transition-all duration-200 ${disabled ? "bg-gray-100 cursor-not-allowed" : "hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"} ${isOpen ? "border-blue-500" : "border-gray-300"}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between">
            <span className={value ? "text-gray-900" : "text-gray-500"}>
              {value || label}
            </span>
            <IoMdArrowDropdown className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-150 ${value === option ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
                role="option"
                aria-selected={value === option}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Location Filters</h2>
        {(selectedProvince || selectedDistrict || selectedSubDistrict) && (
          <button
            onClick={handleClearFilters}
            className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-200"
            aria-label="Clear all filters"
          >
            <MdClear className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        <Dropdown
          label="Select Province"
          options={provinces}
          value={selectedProvince}
          onChange={setSelectedProvince}
          isOpen={isProvinceOpen}
          setIsOpen={setIsProvinceOpen}
        />

        <Dropdown
          label="Select District"
          options={selectedProvince ? districts[selectedProvince] : []}
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          isOpen={isDistrictOpen}
          setIsOpen={setIsDistrictOpen}
          disabled={!selectedProvince}
        />

        <Dropdown
          label="Select Sub-District"
          options={selectedDistrict ? subDistricts[selectedDistrict] : []}
          value={selectedSubDistrict}
          onChange={setSelectedSubDistrict}
          isOpen={isSubDistrictOpen}
          setIsOpen={setIsSubDistrictOpen}
          disabled={!selectedDistrict}
        />
      </div>

      {(selectedProvince || selectedDistrict || selectedSubDistrict) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProvince && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {selectedProvince}
              </span>
            )}
            {selectedDistrict && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {selectedDistrict}
              </span>
            )}
            {selectedSubDistrict && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {selectedSubDistrict}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterListCustom;
