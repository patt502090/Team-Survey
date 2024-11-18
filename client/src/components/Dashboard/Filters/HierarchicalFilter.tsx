import React, { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

const HierarchicalFilter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    team: "ทีมทั้งหมด",
    region: "",
    province: "",
    district: "",
    subDistrict: ""
  });

  const [options, setOptions] = useState({
    teams: [
      "ทีมทั้งหมด",
      "ทีม A",
      "ทีม B",
      "ทีม C",
      "ทีม D"
    ],
    regions: [
      "ภาคเหนือ",
      "ภาคกลาง",
      "ภาคตะวันออกเฉียงเหนือ",
      "ภาคตะวันออก",
      "ภาคตะวันตก",
      "ภาคใต้"
    ],
    provinces: {
      "ภาคเหนือ": ["เชียงใหม่", "เชียงราย", "ลำปาง", "แม่ฮ่องสอน"],
      "ภาคกลาง": ["กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "พระนครศรีอยุธยา"],
      "ภาคตะวันออกเฉียงเหนือ": ["ขอนแก่น", "นครราชสีมา", "อุบลราชธานี", "อุดรธานี"],
      "ภาคตะวันออก": ["ชลบุรี", "ระยอง", "จันทบุรี", "ตราด"],
      "ภาคตะวันตก": ["กาญจนบุรี", "ราชบุรี", "เพชรบุรี", "ประจวบคีรีขันธ์"],
      "ภาคใต้": ["ภูเก็ต", "สงขลา", "สุราษฎร์ธานี", "นครศรีธรรมราช"]
    },
    districts: {
      "เชียงใหม่": ["เมืองเชียงใหม่", "สันทราย", "ดอยสะเก็ด", "แม่ริม"],
      "กรุงเทพมหานคร": ["พระนคร", "ดุสิต", "บางรัก", "ปทุมวัน"],
      "ภูเก็ต": ["เมืองภูเก็ต", "กะทู้", "ถลาง"]
    },
    subDistricts: {
      "เมืองเชียงใหม่": ["ศรีภูมิ", "พระสิงห์", "หายยา", "ช้างม่อย"],
      "พระนคร": ["พระบรมมหาราชวัง", "วังบูรพาภิรมย์", "วัดราชบพิธ", "สำราญราษฎร์"],
      "เมืองภูเก็ต": ["ตลาดใหญ่", "ตลาดเหนือ", "เกาะแก้ว", "รัษฎา"]
    }
  });

  const handleFilterChange = async (level:any, value:string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setFilters(prev => {
      const newFilters = { ...prev, [level]: value };
      if (level === "region") {
        newFilters.province = "";
        newFilters.district = "";
        newFilters.subDistrict = "";
      } else if (level === "province") {
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
      team: "ทีมทั้งหมด",
      region: "",
      province: "",
      district: "",
      subDistrict: ""
    });
  };

  const DropdownSelect = ({ label, value, onChange, options, disabled = false }:any) => (
    <div className="relative w-full md:w-64 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={label}>
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
          <option value="">เลือก{label}</option>
          {options?.map((option:any) => (
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
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      >
        <FiFilter className="w-4 h-4 mr-2" />
        ตัวกรอง
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Modal Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full mx-auto p-6 z-50">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">ตัวกรอง</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={clearFilters}
                      className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                      aria-label="Clear all filters"
                    >
                      <IoMdClose className="w-4 h-4 mr-2" />
                      ล้างทั้งหมด
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                    >
                      <IoMdClose className="w-4 h-4 mr-2" />
                      ปิด
                    </button>
                  </div>
                </div>

                <div className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
                      <BiLoader className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    {/* Team Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">ทีม</h3>
                      <DropdownSelect
                        label="ทีม"
                        value={filters.team}
                        onChange={(value) => handleFilterChange("team", value)}
                        options={options.teams}
                      />
                    </div>

                    {/* Location Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">พื้นที่</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DropdownSelect
                          label="ภาค"
                          value={filters.region}
                          onChange={(value) => handleFilterChange("region", value)}
                          options={options.regions}
                        />

                        <DropdownSelect
                          label="จังหวัด"
                          value={filters.province}
                          onChange={(value) => handleFilterChange("province", value)}
                          options={filters.region ? options.provinces[filters.region] : []}
                          disabled={!filters.region}
                        />

                        <DropdownSelect
                          label="อำเภอ"
                          value={filters.district}
                          onChange={(value) => handleFilterChange("district", value)}
                          options={filters.province ? options.districts[filters.province] || [] : []}
                          disabled={!filters.province}
                        />

                        <DropdownSelect
                          label="ตำบล"
                          value={filters.subDistrict}
                          onChange={(value) => handleFilterChange("subDistrict", value)}
                          options={filters.district ? options.subDistricts[filters.district] || [] : []}
                          disabled={!filters.district}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">ตัวกรองที่เลือก:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, value]) => (
                      value && value !== "ทีมทั้งหมด" && (
                        <span
                          key={key}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {key}: {value}
                        </span>
                      )
                    ))}
                    {!Object.values(filters).some(val => val && val !== "ทีมทั้งหมด") && (
                      <span className="text-gray-500 text-sm">ยังไม่ได้เลือกตัวกรอง</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HierarchicalFilter;