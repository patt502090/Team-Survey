import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface ProvinceData {
  id: number;
  province: string;
  green: number;
  yellow: number;
  red: number;
}

const provinceData: ProvinceData[] = [
  { id: 1, province: "เชียงใหม่", green: 150, yellow: 75, red: 100 },
  { id: 2, province: "เชียงราย", green: 120, yellow: 60, red: 80 },
  { id: 3, province: "ลำปาง", green: 90, yellow: 45, red: 70 },
  { id: 4, province: "พะเยา", green: 80, yellow: 40, red: 60 },
  { id: 5, province: "น่าน", green: 70, yellow: 35, red: 50 },
  { id: 6, province: "กรุงเทพ", green: 200, yellow: 100, red: 150 },
  { id: 7, province: "ชลบุรี", green: 180, yellow: 90, red: 130 },
];

type SortDirection = "ascending" | "descending" | null;

interface SortConfig {
  key: keyof ProvinceData | null;
  direction: SortDirection;
}

const DataTable: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  const handleSort = (key: keyof ProvinceData) => {
    let direction: SortDirection = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName: keyof ProvinceData) => {
    if (sortConfig.key !== columnName) return <FaSort className="inline ml-1" />;
    return sortConfig.direction === "ascending" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  const sortedData = [...provinceData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-3 max-w-6xl">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort("province")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                role="columnheader"
              >
                Province {getSortIcon("province")}
              </th>
              <th
                onClick={() => handleSort("green")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                role="columnheader"
              >
                Green {getSortIcon("green")}
              </th>
              <th
                onClick={() => handleSort("yellow")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                role="columnheader"
              >
                Yellow {getSortIcon("yellow")}
              </th>
              <th
                onClick={() => handleSort("red")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                role="columnheader"
              >
                Red {getSortIcon("red")}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                role="columnheader"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => {
              const total = item.green + item.yellow + item.red;
              return (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors duration-150 ease-in-out`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.province}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.green}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {item.yellow}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {item.red}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {total}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
