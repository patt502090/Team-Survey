import { useState } from "react";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdRestartAlt } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

interface SelectDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const FilterSelectionInterface: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [provinces] = useState<string[]>([
    "Bangkok",
    "Chiang Mai",
    "Phuket",
    "Ayutthaya",
    "Krabi"
  ]);

  const [districts] = useState<Record<string, string[]>>({
    Bangkok: ["Bang Sue", "Chatuchak", "Din Daeng", "Dusit"],
    "Chiang Mai": ["Mueang", "Mae Rim", "San Sai", "Doi Saket"],
    Phuket: ["Mueang", "Kathu", "Thalang"],
    Ayutthaya: ["Phra Nakhon", "Bang Pa-in", "Bang Sai"],
    Krabi: ["Mueang", "Ao Nang", "Khlong Thom"]
  });

  const [subDistricts] = useState<Record<string, string[]>>({
    "Bang Sue": ["Wongsawang", "Bang Sue", "Wong Sawang"],
    Chatuchak: ["Lat Yao", "Chom Phon", "Chatuchak"],
    Mueang: ["Chang Moi", "Si Phum", "Hai Ya"],
    Kathu: ["Patong", "Kamala", "Kathu"]
  });

  const handleProvinceChange = (province: string) => {
    setLoading(true);
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setTimeout(() => setLoading(false), 500);
  };

  const handleDistrictChange = (district: string) => {
    setLoading(true);
    setSelectedDistrict(district);
    setSelectedSubDistrict("");
    setTimeout(() => setLoading(false), 500);
  };

  const handleSubDistrictChange = (subDistrict: string) => {
    setLoading(true);
    setSelectedSubDistrict(subDistrict);
    setTimeout(() => setLoading(false), 500);
  };

  const handleResetFilters = () => {
    setLoading(true);
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setTimeout(() => setLoading(false), 500);
  };

  const SelectDropdown: React.FC<SelectDropdownProps> = ({
    label,
    options,
    value,
    onChange,
    disabled
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredOptions = options?.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="relative w-full md:w-[200px]">
        <div
          className={`relative border ${disabled ? "bg-gray-100" : "bg-white"} rounded-lg shadow-sm w-full`}
        >
          <div
            className={`flex items-center justify-between p-2 cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <span className={`${!value ? "text-gray-400" : "text-gray-900"} text-sm truncate`}>
              {value || (label === "Province" ? "Select Province" : label === "District" ? "Select District" : "Select Sub-district")}
            </span>
            <FiChevronDown
              className={`transition-transform ${isOpen ? "transform rotate-180" : ""}`}
            />
          </div>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-2">
                <div className="flex items-center px-2 py-1 border rounded-md">
                  <BiSearch className="text-gray-400" />
                  <input
                    type="text"
                    className="w-full ml-2 text-sm focus:outline-none"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <ul className="max-h-48 overflow-auto py-1">
                {filteredOptions?.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-1 hover:bg-gray-100 cursor-pointer transition-colors text-sm"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white shadow-sm rounded-lg">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterDrawerOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg w-full justify-center"
        >
          <FiFilter />
          <span>Open Filters</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed inset-y-0 right-0 w-full bg-white shadow-xl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <IoMdClose className="text-xl" />
                </button>
              </div>
              <div className="space-y-4">
                <SelectDropdown
                  label="Province"
                  options={provinces}
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                />

                <SelectDropdown
                  label="District"
                  options={districts[selectedProvince] || []}
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                />

                <SelectDropdown
                  label="Sub-district"
                  options={subDistricts[selectedDistrict] || []}
                  value={selectedSubDistrict}
                  onChange={handleSubDistrictChange}
                  disabled={!selectedDistrict}
                />

                {(selectedProvince || selectedDistrict || selectedSubDistrict) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors w-full"
                  >
                    <MdRestartAlt className="text-lg" />
                    <span className="text-sm">Reset Filters</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filter Interface */}
      <div className="hidden md:block">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
              </div>

              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin text-blue-500" />
              )}

              <SelectDropdown
                label="Province"
                options={provinces}
                value={selectedProvince}
                onChange={handleProvinceChange}
              />

              <SelectDropdown
                label="District"
                options={districts[selectedProvince] || []}
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
              />

              <SelectDropdown
                label="Sub-district"
                options={subDistricts[selectedDistrict] || []}
                value={selectedSubDistrict}
                onChange={handleSubDistrictChange}
                disabled={!selectedDistrict}
              />
            </div>

            {(selectedProvince || selectedDistrict || selectedSubDistrict) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <MdRestartAlt className="text-lg" />
                <span className="text-sm">Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Selected Filters Display (Both Mobile and Desktop) */}
      {(selectedProvince || selectedDistrict || selectedSubDistrict) && (
        <div className="flex items-center text-sm text-gray-600 mt-4">
          <span className="font-medium mr-2">Selected:</span>
          <span>
            {[selectedProvince, selectedDistrict, selectedSubDistrict]
              .filter(Boolean)
              .join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterSelectionInterface;
