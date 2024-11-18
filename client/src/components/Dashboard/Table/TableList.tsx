import React from "react";

const TableComponent = ({ tableData, activeIndex }) => {
  return (
    <div className="w-full md:w-1/2 mt-6 md:mt-0">
      <div className="overflow-x-auto">
        <table
          className="w-full text-xs md:text-sm text-left text-gray-500"
          role="table"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-3 md:px-6 py-2 md:py-3 rounded-tl-lg">
                Category
              </th>
              <th scope="col" className="px-3 md:px-6 py-2 md:py-3">
                Distribution
              </th>
              <th scope="col" className="px-3 md:px-6 py-2 md:py-3">Count</th>
              <th scope="col" className="px-3 md:px-6 py-2 md:py-3 rounded-tr-lg">
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
                <td className="px-3 md:px-6 py-2 md:py-4 font-medium text-gray-900">
                  {item.category}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4">{item.percentage}</td>
                <td className="px-3 md:px-6 py-2 md:py-4">{item.count}</td>
                <td className="px-3 md:px-6 py-2 md:py-4">{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
