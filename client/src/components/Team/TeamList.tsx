import React, { useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { ModalDelateTeam } from "./ModalDeleteTeam";

interface Member {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phoneNumber: string;
  first_name: string;
  last_name: string;
}

interface Team {
  id: number;
  documentId: string;
  TeamName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  manager: {
    username: string;
    profileImage: string;
  };
  members: Member[];
}

interface TeamListProps {
  searchQuery: string;
  data: { data: Team[] } | null;
  newFetch: () => void;
}

const TeamList = ({ newFetch ,searchQuery, data }: TeamListProps) => {
  const dataTeam = data && Array.isArray(data.data) ? data.data : [];
  // console.log(dataTeam);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false) ;
    setTeamToDelete(null);
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeamToDelete(teamId);
    setIsModalOpen(true);
  };

  const filteredTeams = dataTeam.filter(
    (team) =>
      team.TeamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.manager?.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="space-y-4">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="p-6 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  alt={team.manager?.username || "Default Username"}
                  className="w-12 h-12 rounded-full mr-4"
                  src={
                    team.manager?.profileImage ||
                    "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                  }
                  onError={(e) => {
                    e.target.src =
                      "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";
                  }}
                />

                <div>
                  <h3 className="text-xl font-semibold">{team.TeamName}</h3>
                </div>
              </div>
              <div>
                <button
                  className="text-teal-500 hover:text-teal-600"
                  onClick={() => alert("Edit team")}
                >
                  <FiEdit3 className="w-5 h-5" />
                </button>
                <button
                  className="text-red-500 hover:text-red-600 ml-3"
                  onClick={() => handleDeleteTeam(team.documentId)}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>


              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                หัวหน้าทีม: {team.manager?.username} | จำนวนสมาชิก:{" "}
                {team.members.length} | เก็บข้อมูลแล้ว: 0
              </p>
              <p className="text-sm text-gray-400 mt-2">
                สร้างเมื่อ: {new Date(team.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
      <ModalDelateTeam
        newFetch={newFetch}
        teamId={teamToDelete}
        open={isModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    )}
    </div>
  );
};

export default TeamList;
