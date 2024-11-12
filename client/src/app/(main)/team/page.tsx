"use client";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TeamList from "../../../components/Team/Main/TeamList";
import { BreadcrumbsWithIcon } from "@/components/Dashboard/Breadcrumbs";
import StatsTeamComponent from "../../../components/Team/Card/StatsCardForAllTeam";
import { CreateTeamButton } from "@/components/Team/Button/CreateTeamButton";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import { AuthContext } from "@/contexts/Auth.context";
import TeamMembersList from "@/components/Team/Main/TeamMembersList";
import { Toaster } from "react-hot-toast";
import { AddWorkerButton } from "@/components/Team/Button/AddWorkerButton";
import StatsMyTeamComponent from "@/components/Team/Card/StatsCardForMyTeam";
import { Button } from "@material-tailwind/react";

export interface Team {
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
  my_customers: any[];
}

interface Manager {
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
  const [myTeamData, setMyTeamData] = useState<Team | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState || {};
  const [teamId, setTeamId] = useState<string>("");

  useEffect(() => {
    fetchTeamsData();
  }, []);

  useEffect(() => {
    if (user?.team?.documentId || user?.my_team?.documentId || selectedTeam) {
      fetchMyTeamData();
    }
  }, [user, selectedTeam]);

  const handleSelectTeam = (docId: string) => setSelectedTeam(docId);
  const handleBackToList = () => setSelectedTeam(null);

  const fetchTeamsData = async () => {
    try {
      const teamsResult = await ax.get(`${conf.teamEndpoint}`);
      setTeamsData(teamsResult.data.data);
    } catch (error) {
      console.error("Error fetching teams data:", error);
    }
  };
  const fetchMyTeamData = async () => {
    const docId =
      user?.team?.documentId || user?.my_team?.documentId || selectedTeam;
    if (!docId) {
      console.log("No team data available for user.");
      return;
    }

    try {
      const myTeamResult = await ax.get(
        `/teams/${
          user?.team?.documentId || user?.my_team?.documentId || selectedTeam
        }?populate=*&?populate[members][populate]=my_customers`
      );
      console.log(myTeamResult?.data?.data);
      setMyTeamData(myTeamResult?.data?.data);
      setTeamId(myTeamResult?.data?.data?.id);
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
          {!selectedTeam && (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-3 md:mb-6 font-poppins tracking-wide">
              การจัดการทีม
            </h1>
          )}
        </div>
        {user?.role?.name === "Admin" && !selectedTeam ? (
          <CreateTeamButton newFetch={fetchTeamsData} />
        ) : user?.role?.name === "Team Leader" ? (
          <AddWorkerButton newFetchMyTeam={fetchMyTeamData} teamId={teamId} />
        ) : null}
      </div>

      {selectedTeam ? (
        <div>
          <div className="flex justify-start">
            <Button onClick={handleBackToList} color="blue" className="my-6">
              กลับ
            </Button>
          </div>
          <div className="mb-6">
            <StatsMyTeamComponent />
          </div>
          <TeamMembersList myTeamData={myTeamData} />
        </div>
      ) : (
        <>
          <div className="mb-6">
            {user?.role?.name !== "Admin" ? (
              <StatsMyTeamComponent />
            ) : (
              <StatsTeamComponent />
            )}
          </div>

          {user?.role?.name === "Admin" && (
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
          )}

          {user?.role?.name === "Admin" ? (
            <TeamList
              newFetch={fetchTeamsData}
              data={{ data: TeamsData }}
              searchQuery={searchQuery}
              onTeamSelect={handleSelectTeam}
            />
          ) : (
            myTeamData && <TeamMembersList myTeamData={myTeamData} />
          )}
          <Toaster position="top-right" reverseOrder={false} />
        </>
      )}
    </div>
  );
};

export default TeamManagement;
