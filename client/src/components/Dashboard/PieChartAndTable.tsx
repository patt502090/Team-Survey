import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface MockData {
  name: string;
  value: number;
  color: string;
}

interface TableData {
  category: string;
  percentage: string;
  count: number;
  revenue: string;
}

const CustomerDistribution: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mockData: MockData[] = [
    { name: "ลูกค้าที่สนใจ", value: 35, color: "#22c55e" },
    { name: "ลูกคาที่ยังไม่แน่ใจ", value: 45, color: "#eab308" },
    { name: "ลูกค้าที่ไม่สนใจ", value: 20, color: "#ef4444" },
  ];

  const tableData: TableData[] = [
    {
      category: "ลูกค้าที่สนใจ",
      percentage: "35%",
      count: 350,
      revenue: "$35,000",
    },
    {
      category: "ลูกคาที่ยังไม่แน่ใจ",
      percentage: "45%",
      count: 450,
      revenue: "$22,500",
    },
    {
      category: "ลูกค้าที่ไม่สนใจ",
      percentage: "20%",
      count: 200,
      revenue: "$5,000",
    },
  ];

  const onPieEnter = (_: any, index: number): void => {
    setActiveIndex(index);
  };

  const onPieLeave = (): void => {
    setActiveIndex(null);
  };

  return (
    <div>
      <h2 className="text-xl md:text-1xl font-bold text-gray-700 mb-4 md:mb-10 text-center ">
        การกระจายประเภทลูกค้า
      </h2>

      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8">
        {/* Pie Chart Section */}
        <div
          className="w-full md:w-1/2"
          role="img"
          aria-label="Customer distribution pie chart"
        >
          <ResponsiveContainer width="100%" height={300} className="mt-4">
            <PieChart>
              <Pie
                data={mockData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {mockData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? "#ffffff" : "transparent"}
                    strokeWidth={activeIndex === index ? 3 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [`${value}%`, "Distribution"]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {mockData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs md:text-sm text-gray-600">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <div className="overflow-x-auto">
            <table
              className="w-full text-xs md:text-sm text-left text-gray-500"
              role="table"
            >
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-2 md:py-3 rounded-tl-lg"
                  >
                    Category
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3">
                    Distribution
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3">
                    Count
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 py-2 md:py-3 rounded-tr-lg"
                  >
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={`row-${index}`}
                    className={`${
                      activeIndex === index ? "bg-gray-50" : "bg-white"
                    } border-b hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-3 md:px-6 py-2 md:py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.category === "ลูกค้าที่สนใจ"
                            ? "bg-green-100 text-green-800"
                            : item.category === "ลูกคาที่ยังไม่แน่ใจ"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>

                    <td className="px-3 md:px-6 py-2 md:py-4">
                      {item.percentage}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 ">{item.count}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4">
                      {item.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDistribution;
