// import { FaEllipsisH } from "react-icons/fa";
// import { myTeam } from "@/app/(main)/team/page";

// interface TeamMemberCardProps {
//   member: myTeam;
//   onDropdownClick: (memberId: string) => void;
//   dropdownOpen: string | null;
//   onKickMember: (memberId: string) => void;
// }

// const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onDropdownClick, dropdownOpen, onKickMember }) => {
//   return (
//     <div
//       className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 relative"
//       role="listitem"
//     >
//       <span
//         className="absolute top-2 right-2 bg-gray-300 p-1 rounded-full cursor-pointer"
//         onClick={() => onDropdownClick(member.id)}
//         aria-label="More Options"
//       >
//         <FaEllipsisH className="text-gray-600" />
//       </span>

//       {/* Dropdown Menu */}
//       {dropdownOpen === member.id && (
//         <div className="absolute top-8 right-2 bg-white shadow-lg rounded-md w-48 py-2">
//           <button
//             onClick={() => onKickMember(member.id)}
//             className="text-red-600 hover:bg-gray-100 w-full text-left px-4 py-2"
//           >
//             เตะออกจากทีม
//           </button>
//         </div>
//       )}

//       <div className="flex items-center space-x-4">
//         <div className="relative">
//           <img
//             src={member.profileImage || "https://via.placeholder.com/150"}
//             alt={member.username}
//             className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
//           />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">{member.username}</h3>
//           <p className="text-gray-600 text-sm">{"พนักงาน"}</p>
//           <div className="flex items-center mt-2 text-green-600">
//             <span>เก็บข้อมูลแล้วจำนวน {member || "0"} คน</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamMemberCard;
