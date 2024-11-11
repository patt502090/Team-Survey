"use client";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TeamList from "../../../components/Team/TeamList";
import { BreadcrumbsWithIcon } from "@/components/Dashboard/Breadcrumbs";
import StatsTeamComponent from "../../../components/Team/StatsCard";
import { CreateTeamButton } from "@/components/Team/CreateTeamButton";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import { AuthContext } from "@/contexts/Auth.context";
import TeamMembersList from "@/components/Team/TeamMembersList";

interface Team {
  id: number;
  documentId: string;
  TeamName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  manager: {
    username: string;
  };
  members: Member[];
}

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

const TeamManagement = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [TeamsData, setTeamsData] = useState<Team[]>([]);
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState;

  useEffect(() => {
    fetchTeamsData();
  }, []);

  const fetchTeamsData = async () => {
    try {
      const teamsResult = await ax.get(`${conf.teamEndpoint}`);
      setTeamsData(teamsResult.data.data);
    } catch (error) {
      console.error("Error fetching teams data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:ml-72" role="main">
      <div className="mt-1">
        <BreadcrumbsWithIcon pathName="Team" />
      </div>
      <div className="flex justify-between items-center mb-6 md:mb-0 mt-6 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3  md:mb-6">
            Team Management
          </h1>
        </div>
        <CreateTeamButton />
      </div>

      {/* StatsCard */}
      <div className="mb-6">
        <StatsTeamComponent />
      </div>

      {/* Search */}
      {user?.role?.name == "Admin" ? (
        <div className="mb-6">
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
      ) : null}

      {/* List Teams */}
      {user?.role?.name == "Admin" ? (
        <TeamList data={{ data: TeamsData }} searchQuery={searchQuery} />
      ) : (
        <TeamMembersList />
      )}
    </div>
  );
};

export default TeamManagement;
