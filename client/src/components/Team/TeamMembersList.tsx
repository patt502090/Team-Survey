import { AuthContext } from "@/contexts/Auth.context";
import React, { useContext, useState } from "react";
import { FaUserTie, FaChartLine, FaStar } from "react-icons/fa";
import NoTeam from "./TeamNotAvailable";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  surveyCount: number;
  image: string;
}

interface TeamLeader extends TeamMember {}

interface TeamData {
  teamName: string;
  teamLeader: TeamLeader;
  teamMembers: TeamMember[];
}

const TeamMembersList: React.FC = () => {
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState;
  console.log("userMe", user);

  const [teamData] = useState<TeamData>({
    teamName: "Innovation Dynamics",
    teamLeader: {
      name: "Sarah Anderson",
      role: "Technical Lead",
      surveyCount: 48,
      image: "images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3"
    },
    teamMembers: [
      {
        id: 1,
        name: "Michael Chen",
        role: "Senior Developer",
        surveyCount: 35,
        image: "images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
      },
      {
        id: 2,
        name: "Emma Wilson",
        role: "UX Designer",
        surveyCount: 42,
        image: "images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3"
      },
      {
        id: 3,
        name: "James Rodriguez",
        role: "Frontend Developer",
        surveyCount: 31,
        image: "images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
      },
      {
        id: 4,
        name: "Lisa Wang",
        role: "Backend Developer",
        surveyCount: 38,
        image: "images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
      }
    ]
  });

  if (!user?.my_team && !user?.team) {
    return <NoTeam/>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg" role="region" aria-label="Team Information">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" aria-label={`Team Name: ${teamData.teamName}`}>
       {user.my_team?.TeamName || user.team?.TeamName}
      </h1>

      <div className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-102 transition-transform duration-300" role="article" aria-label="Team Leader Information">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={`https://${teamData.teamLeader.image}`}
                  alt={teamData.teamLeader.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3";
                  }}
                />
                <span className="absolute -top-2 -right-2 bg-yellow-400 p-1 rounded-full">
                  <FaStar className="text-white" />
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaUserTie className="text-blue-600" />
                  {teamData.teamLeader.name}
                </h2>
                <p className="text-gray-600">{teamData.teamLeader.role}</p>
                <div className="flex items-center mt-2 text-blue-600">
                  <FaChartLine className="mr-2" />
                  <span>{teamData.teamLeader.surveyCount} Surveys Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Team Members">
        {teamData.teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
            role="listitem"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`https://${member.image}`}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3";
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
                <div className="flex items-center mt-2 text-green-600">
                  <FaChartLine className="mr-2" />
                  <span>{member.surveyCount} Surveys Completed</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembersList;
