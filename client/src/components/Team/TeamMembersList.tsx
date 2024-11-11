import { AuthContext } from "@/contexts/Auth.context";
import React, { useContext, useState } from "react";
import { FaUserTie, FaChartLine, FaStar } from "react-icons/fa";
import NoTeam from "./TeamNotAvailable";
import { myTeam } from "@/app/(main)/team/page";

interface TeamMembersListProps {
  myTeamData: myTeam;
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({ myTeamData }) => {
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState;

  //   console.log("userMe", user);

  if (!user?.my_team && !user?.team) {
    return <NoTeam />;
  }

  console.log("My Team: ", myTeamData);

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg"
      role="region"
      aria-label="Team Information"
    >
      <h1
        className="text-3xl font-bold text-center mb-8 text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        aria-label={`Team Name: ${myTeamData?.TeamName}`}
      >
        {user.my_team?.TeamName || user.team?.TeamName}
      </h1>

      <div className="mb-10">
        <div
          className="bg-white p-6 rounded-lg shadow-md transform hover:scale-102 transition-transform duration-300"
          role="article"
          aria-label="Team Leader Information"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                    // src={`https://${teamData.teamLeader.image}`}
                  src={`https://images.unsplash.com/photo-1624916912082-ba582456d162?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt={myTeamData?.manager?.username || "Team Manager"}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3";
                  }}
                />
                <span className="absolute -top-2 -right-2 bg-yellow-400 p-1 rounded-full">
                  <FaStar className="text-white" />
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaUserTie className="text-blue-600" />
                  {myTeamData?.manager?.username || "Team Manager"}
                </h2>
                <p className="text-gray-600">{"Team Leader"}</p>
                <div className="flex items-center mt-2 text-blue-600">
                  {/* <FaChartLine className="mr-2" /> */}
                  {/* <span>10 Surveys Completed</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        role="list"
        aria-label="Team Members"
      >
        {myTeamData?.members.map((member) => (
          <div
            key={member.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
            role="listitem"
          >
            <div className="flex items-center space-x-4">
              <img
                // src={`https://${member?.image}`}
                src={`"https://images.unsplash.com/photo-1624916912082-ba582456d162?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"`}
                alt={member.username}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3";
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.username}
                </h3>
                <p className="text-gray-600 text-sm">{"Worker"}</p>
                <div className="flex items-center mt-2 text-green-600">
                  <FaChartLine className="mr-2" />
                  <span>{member.my_customers.length} Surveys Completed</span>
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
