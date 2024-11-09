"use client"
import React, { useState } from "react";
import { FiUserPlus, FiSearch } from "react-icons/fi";
import TeamList from "../../../components/Team/TeamList";
import StatsCard from "../../../components/Team/StatsCard";
import { stats } from "../../../components/Team/static";

const TeamManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-8" role="main">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
        </div>
        <button
          onClick={() => alert('Create new team')}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300 flex items-center gap-2"
        >
          <FiUserPlus className="w-5 h-5" />
          Create Team
        </button>
      </div>

      {/* StatsCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
            placeholder="Search teams or team leaders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List Teams */}
      <TeamList searchQuery={searchQuery} />
    </div>
  );
};

export default TeamManagement;
