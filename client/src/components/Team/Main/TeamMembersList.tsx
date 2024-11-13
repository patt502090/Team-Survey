import { AuthContext } from "@/contexts/Auth.context";
import React, { useContext, useState } from "react";
import { FaUserTie, FaChartLine, FaStar, FaEllipsisH } from "react-icons/fa";
import NoTeam from "./TeamNotAvailable";
import { Team } from "@/app/(main)/team/page";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import ax from "@/conf/ax";
import toast from "react-hot-toast";

interface TeamMembersListProps {
  myTeamData: Team | null;
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({ myTeamData }) => {
  const { state: ContextState } = useContext<any>(AuthContext);
  const { user } = ContextState;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberDocToKick, setMemberDocToKick] = useState<string | null>(null);
  const [memberIdToKick, setMemberIdToKick] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);


  const handleKickMember = (memberDocId: string, memberId: number) => {
    setMemberDocToKick(memberDocId);
    setMemberIdToKick(memberId);
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  const toggleDropdown = (memberId: string) => {
    setDropdownOpen(dropdownOpen === memberId ? null : memberId);
  };

  console.log(myTeamData?.documentId);
  const confirmKick = async () => {
    if (memberDocToKick) {
      console.log(`กำลังเตะสมาชิกที่มี ID: ${memberDocToKick} ออกจากทีม`);

      try {
        const resultKickTeam = await ax.put(
          `/teams/${myTeamData?.documentId}`,
          {
            data: {
              members: {
                disconnect: [memberDocToKick],
              },
            },
          }
        );
        console.log("Successfully kicked off the team", resultKickTeam);
        const resultDegradeRole = await ax.put(`/assign_role`, {
          data: {
            userId: memberIdToKick,
            roleId: 1,
          },
        });
        console.log("Successfully demoted", resultDegradeRole);
        toast.success("เชิญออกจากทีมสำเร็จ");
      } catch (e) {
        console.error(e);
      }
      setIsModalOpen(false);
    }
  };

  const cancelKick = () => {
    setIsModalOpen(false);
  };

  if (!user?.my_team && !user?.team && !myTeamData) {
    return <NoTeam />;
  }

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
                <p className="text-gray-600">{"หัวหน้าทีม"}</p>
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
        {myTeamData?.members.map((member:any) => (
          <div
            key={member.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 relative"
            role="listitem"
          >
            {user?.role?.name == "Team Leader" && (
              <span
                className="absolute top-2 right-2 bg-gray-300 p-1 rounded-full cursor-pointer"
                onClick={() => toggleDropdown(member?.documentId)}
                aria-label="More Options"
              >
                <FaEllipsisH className="text-gray-600" />
              </span>
            )}

            {dropdownOpen === member?.documentId && (
              <div className="absolute top-8 right-2 bg-white shadow-lg rounded-md w-48 py-2">
                <button
                  onClick={() =>
                    handleKickMember(member?.documentId, member?.id)
                  }
                  className="text-red-600 hover:bg-gray-100 w-full text-left px-4 py-2"
                >
                  เชิญออกจากทีม
                </button>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s`}
                  alt={member.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3";
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.username}{" "}
                  {member.username === user?.username && (
                    <span className="text-xs text-blue-500 ml-2">(ฉัน)</span>
                  )}
                </h3>
                <p className="text-gray-600 text-sm">{"สมาชิก"}</p>
                <div className="flex items-center mt-2 text-green-600">
                  <FaChartLine className="mr-2" />
                  <span className="text-xs md:text-base">
                    เก็บข้อมูลแล้วจำนวน {member?.my_customers?.length || "0"} คน
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={cancelKick}>
        <DialogHeader className="text-xl font-semibold mb-4">
          คุณแน่ใจหรือไม่ว่าต้องการเชิญสมาชิกออกจากทีม?
        </DialogHeader>
        <DialogBody>หากเชิญออก ข้อมูลสมาชิกจะถูกลบออกจากทีมนี้</DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={cancelKick}>
            <span>ยกเลิก</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={confirmKick}
            className="ml-2"
          >
            <span>ตกลง</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default TeamMembersList;
