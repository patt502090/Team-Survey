import React from "react";
import { FiUsers, FiUserX, FiSettings, FiAward } from "react-icons/fi";

const icons = [FiUsers, FiUserX, FiSettings, FiAward];

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

const StatsTeamComponent = () => {
  const stats = [
    { title: "Total Teams", value: 100, icon: icons[0], color: "bg-gradient-to-r from-blue-500 to-teal-400" },
    { title: "Teams Without Members", value: 20, icon: icons[1], color: "bg-gradient-to-r from-indigo-400 to-pink-500" },
    { title: "Active Projects", value: 10, icon: icons[2], color: "bg-gradient-to-r from-blue-500 to-teal-400" },
    { title: "Team Achievements", value: 5, icon: icons[3], color: "bg-gradient-to-r from-indigo-400 to-pink-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsTeamComponent;