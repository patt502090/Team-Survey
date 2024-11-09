import React from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { teams } from "./static";

const TeamList = ({ searchQuery }: { searchQuery: string }) => {
  const filteredTeams = teams.filter(
    team =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="space-y-4">
        {filteredTeams.map((team) => (
          <div key={team.id} className="p-6 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={`https://${team.leaderImage}`}
                  alt={team.leader}
                  className="w-12 h-12 rounded-full mr-4"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                  }}
                />
                <div>
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                  <p className="text-gray-600 text-sm">{team.description}</p>
                </div>
              </div>
              <div>
                <button
                  className="text-teal-500 hover:text-teal-600"
                  onClick={() => alert('Edit team')}
                >
                  <FiEdit3 className="w-5 h-5" />
                </button>
                <button
                  className="text-red-500 hover:text-red-600 ml-3"
                  onClick={() => alert('Delete team')}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Leader: {team.leader} | Members: {team.members} | Surveyed: {team.surveyed}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
