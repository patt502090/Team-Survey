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
import { Toaster } from "react-hot-toast";
import { AddWorkerButton } from "@/components/Team/AddWorkerButton";

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

export interface myTeam {
  id: number;
  documentId: string;
  TeamName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  members: Member[];
  manager: Manager;
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
  my_customers: any[];
}

export interface Manager {
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
  const [myTeamData, setMyTeamData] = useState<myTeam | null>(null);
  const { state: ContextState } = useContext<any>(AuthContext);
  const { user } = ContextState;
  const [teamId, setTeamId] = useState<string>("");

  useEffect(() => {
    fetchTeamsData();
  }, []);

  useEffect(() => {
    if (user?.team?.documentId || user?.my_team?.documentId) {
      fetchMyTeamData();
    }
  }, [user]);

  const fetchTeamsData = async () => {
    try {
      const teamsResult = await ax.get(`${conf.teamEndpoint}`);
      setTeamsData(teamsResult.data.data);
    } catch (error) {
      console.error("Error fetching teams data:", error);
    }
  };
  // console.log("Teams",user.team.documentId)

  // console.log(`/teams/${user?.team?.documentId || user?.my_team?.documentId}?populate=*&?populate[members][populate]=my_customers)`);

  const fetchMyTeamData = async () => {
    if (!user?.team?.documentId && !user?.my_team?.documentId) {
      console.log("No team data available for user.");
      return;
    }

    try {
      const myTeamResult = await ax.get(
        `/teams/${
          user?.team?.documentId || user?.my_team?.documentId
        }?populate=*&?populate[members][populate]=my_customers`
      );
      console.log(myTeamResult);
      setMyTeamData(myTeamResult?.data?.data);
      setTeamId(myTeamResult?.data?.data?.id);
      // console.log("doc",myTeamResult?.data?.data?.documentId)
      // console.log("my", myTeamResult.data.data);
    } catch (error) {
      console.log("Error fetching my team data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:ml-72" role="main">
      <div className="mt-1">
        <BreadcrumbsWithIcon pathName="Team" />
      </div>
      <div className="flex justify-between items-center mb-6 md:mb-0 mt-6 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-3 md:mb-6 font-poppins tracking-wide">
            การจัดการทีม
          </h1>
        </div>
        {user?.role.name == "Admin" ? (
          <CreateTeamButton newFetch={fetchTeamsData} />
        ) : user?.role?.name == "Team Leader" ? (
          <AddWorkerButton newFetchMyTeam={fetchMyTeamData} teamId= {teamId} />
        ) : null}
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
              placeholder="ค้นหาทีมหรือหัวหน้าทีม"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      ) : null}

      {/* List Teams */}
      {user?.role?.name == "Admin" ? (
        <TeamList
          newFetch={fetchTeamsData}
          data={{ data: TeamsData }}
          searchQuery={searchQuery}
        />
      ) : (
        myTeamData && <TeamMembersList myTeamData={myTeamData} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default TeamManagement;
