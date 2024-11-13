import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiChevronDown, FiFilter } from "react-icons/fi";
import { Button } from "@material-tailwind/react";

interface FilterComponentProps {}

interface Location {
  [province: string]: {
    [district: string]: string[];
  };
}

const FilterComponent: React.FC<FilterComponentProps> = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("ทั้งหมด");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState({
    team: false,
    province: false,
    district: false,
    subDistrict: false,
  });

  const [filterVisible, setFilterVisible] = useState<boolean>(false); 

  const teams: string[] = [
    "ทั้งหมด",
    "วิศวกรรม",
    "การตลาด",
    "การขาย",
    "ออกแบบ",
    "ผลิตภัณฑ์",
  ];
  const locations: Location = {
    จังหวัดตะวันตก: {
      "อำเภอ A": ["ตำบล 1", "ตำบล 2", "ตำบล 3"],
      "อำเภอ B": ["ตำบล 4", "ตำบล 5", "ตำบล 6"],
    },
    จังหวัดตะวันออก: {
      "อำเภอ C": ["ตำบล 7", "ตำบล 8", "ตำบล 9"],
      "อำเภอ D": ["ตำบล 10", "ตำบล 11", "ตำบล 12"],
    },
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
    setShowError(false);
    setIsOpen({ ...isOpen, team: false });
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setShowError(false);
    setIsOpen({ ...isOpen, province: false });
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedSubDistrict("");
    setShowError(false);
    setIsOpen({ ...isOpen, district: false });
  };

  const handleSubDistrictChange = (subDistrict: string) => {
    setSelectedSubDistrict(subDistrict);
    setShowError(false);
    setIsOpen({ ...isOpen, subDistrict: false });
  };

  const clearFilters = () => {
    setSelectedTeam("ทั้งหมด");
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setShowError(false);
    setIsOpen({
      team: false,
      province: false,
      district: false,
      subDistrict: false,
    });
  };

  const removeTeam = () => {
    setSelectedTeam("ทั้งหมด");
  };

  const removeLocation = (type: "province" | "district" | "subDistrict") => {
    switch (type) {
      case "province":
        setSelectedProvince("");
        setSelectedDistrict("");
        setSelectedSubDistrict("");
        break;
      case "district":
        setSelectedDistrict("");
        setSelectedSubDistrict("");
        break;
      case "subDistrict":
        setSelectedSubDistrict("");
        break;
      default:
        break;
    }
  };

  interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    disabled?: boolean;
    id: "team" | "province" | "district" | "subDistrict";
  }

  const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled,
    id,
  }) => (
    <div className="relative w-full">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen({ ...isOpen, [id]: !isOpen[id] })}
          className={`block w-full rounded-md border ${
            disabled ? "bg-gray-100" : "bg-white"
          } border-gray-300 py-2 pl-3 pr-10 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={disabled}
        >
          {value || `เลือก${label}`}
          <FiChevronDown
            className={`absolute right-3 top-2.5 h-5 w-5 text-gray-400 transition-transform ${
              isOpen[id] ? "transform rotate-180" : ""
            }`}
          />
        </button>
        {isOpen[id] && !disabled && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
            <ul className="max-h-60 rounded-md py-1 text-sm overflow-auto focus:outline-none">
              {options.map((option) => (
                <li
                  key={option}
                  className={`cursor-pointer select-none px-3 py-2 hover:bg-blue-50 ${
                    value === option ? "bg-blue-100" : ""
                  }`}
                  onClick={() => onChange(option)}
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

  useEffect(() => {
    if (selectedTeam === "ออกแบบ" && selectedProvince === "จังหวัดตะวันตก") {
      setShowError(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".relative")) {
        setIsOpen({
          team: false,
          province: false,
          district: false,
          subDistrict: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectedTeam, selectedProvince]);

  return (
    <div className="">
      <Button
        onClick={() => setFilterVisible(!filterVisible)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4 flex items-center gap-2"
      >
        <FiFilter className="h-4 w-4" />
        {filterVisible ? "ปิดตัวกรอง" : "แสดงตัวกรอง"}
      </Button>

      {filterVisible && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
            <div className="w-full md:w-1/4">
              <CustomSelect
                id="team"
                label="ทีม"
                value={selectedTeam}
                onChange={handleTeamChange}
                options={teams}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/4">
              <div className="w-full md:w-1/3">
                <CustomSelect
                  id="province"
                  label="จังหวัด"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  options={Object.keys(locations)}
                />
              </div>

              <div className="w-full md:w-1/3">
                <CustomSelect
                  id="district"
                  label="อำเภอ"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  options={
                    selectedProvince
                      ? Object.keys(locations[selectedProvince])
                      : []
                  }
                  disabled={!selectedProvince}
                />
              </div>

              <div className="w-full md:w-1/3">
                <CustomSelect
                  id="subDistrict"
                  label="ตำบล"
                  value={selectedSubDistrict}
                  onChange={handleSubDistrictChange}
                  options={
                    selectedProvince && selectedDistrict
                      ? locations[selectedProvince][selectedDistrict]
                      : []
                  }
                  disabled={!selectedDistrict}
                />
              </div>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="ล้างตัวกรองทั้งหมด"
          >
            ล้างตัวกรอง
          </button>

          {showError && (
            <div className="mt-4 text-red-500 text-sm">
              <IoClose className="inline-block mr-2" />
              กรุณาเลือกข้อมูลที่ถูกต้อง
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
