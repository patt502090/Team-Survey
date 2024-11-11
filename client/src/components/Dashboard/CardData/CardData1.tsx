import React from "react";
import { FiUsers, FiBarChart2, FiTarget, FiTrendingUp } from "react-icons/fi";

type Stat = {
  id: number;
  title: string;
  value: number | string;
  increase: boolean;
  percentage: string;
  icon: JSX.Element;
  description: string;
};

const CardStats: React.FC = () => {
  const stats: Stat[] = [
    {
      id: 1,
      title: "สมาชิกทีม",
      value: 48,
      increase: true,
      percentage: "+12%",
      icon: <FiUsers className="w-4 h-4" />,
      description: "ผู้เข้าร่วมที่ใช้งาน",
    },
    {
      id: 2,
      title: "อัตราการตอบกลับ",
      value: "86%",
      increase: true,
      percentage: "+5%",
      icon: <FiBarChart2 className="w-4 h-4" />,
      description: "การกรอกแบบสอบถาม",
    },
    {
      id: 3,
      title: "เป้าหมายที่บรรลุ",
      value: "92%",
      increase: false,
      percentage: "-3%",
      icon: <FiTarget className="w-4 h-4" />,
      description: "มาตรฐานเป้าหมาย",
    },
    {
      id: 4,
      title: "คะแนนการมีส่วนร่วม",
      value: 8.9,
      increase: true,
      percentage: "+0.7",
      icon: <FiTrendingUp className="w-4 h-4" />,
      description: "ความพึงพอใจของทีม",
    },
  ];

  return (
    <div className="p-3 w-full">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 border border-gray-100"
            role="region"
            aria-label={`${stat.title} สถิติ`}
            tabIndex={0}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-full bg-blue-50">
                {stat.icon}
              </div>
              <span
                className={`text-xs font-medium ${
                  stat.increase ? "text-green-500" : "text-red-500"
                } flex items-center`}
              >
                {stat.percentage}
              </span>
            </div>

            <h3 className="text-sm font-medium text-gray-700 mb-0.5">
              {stat.title}
            </h3>
            <div className="flex items-baseline">
              <span className="text-xl font-semibold text-gray-900">
                {stat.value}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>

            <div className="mt-3 h-0.5 w-full bg-gray-50 rounded-full overflow-hidden">
              <div
                className={`h-0.5 ${
                  stat.increase ? "bg-green-500" : "bg-red-500"
                } rounded-full transition-all duration-300`}
                style={{
                  width: typeof stat.value === "string" ? stat.value : "75%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStats;
