import React from "react";
import { FiUsers, FiUserX, FiSettings, FiAward } from "react-icons/fi";

const StatsCard = ({ title, value, icon, color }: { title: string, value: number, icon: any, color: string }) => {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      role="region"
      aria-label={`${title} Statistics`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg shadow-sm`}>
          {React.createElement(icon, { className: "w-6 h-6 text-white" })}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
