import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  iconColor?: string; 
  bgColor?: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  iconColor = "text-purple-500", 
  bgColor = "bg-blue-100",
  children,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform transform hover:scale-105 duration-200">
      <div className={`flex justify-center items-center w-12 h-12 rounded-full ${bgColor} ${iconColor}`}>
        {children}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-semibold text-gray-700">{total}</h4>
          <span className="text-sm font-medium text-gray-500">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp ? "text-green-500" : ""
          } ${levelDown ? "text-red-500" : ""}`}
        >
          {rate}

          {levelUp && (
            <svg
              className="w-3 h-3 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path d="M5 0L10 5H7V10H3V5H0L5 0Z" fill="currentColor" />
            </svg>
          )}

          {levelDown && (
            <svg
              className="w-3 h-3 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path d="M5 10L0 5H3V0H7V5H10L5 10Z" fill="currentColor" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
