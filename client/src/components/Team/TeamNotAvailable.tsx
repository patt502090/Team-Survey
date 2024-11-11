import React from "react";
import { FaUsers } from "react-icons/fa";

const NoTeam = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg min-h-[400px] flex flex-col items-center justify-center" role="region" aria-label="No Team Information">
      <FaUsers className="text-gray-400 text-6xl mb-4" />
      <h2 className="text-2xl font-bold text-gray-600 mb-3">No Team Available</h2>
    </div>
  );
};

export default NoTeam;