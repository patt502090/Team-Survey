import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import GroupsIcon from "@mui/icons-material/Groups";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import { AuthContext } from "@/contexts/Auth.context";
import { useRouter } from "next/navigation";

export default function DefaultSidebar() {
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    role: "",
    team: "",
  });
  console.log("this", user);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await ax.get(`${conf.jwtUserEndpoint}`);
        setUserData({
          username: result.data.username,
          role: result.data.role.name,
          team: result.data.team || "N/A",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Card
      className={`h-screen w-full transition-all duration-300 shadow-xl shadow-blue-gray-900/5 p-4 fixed  ${
        collapsed ? "max-w-[4rem]" : "max-w-[17rem]"
      } bg-gray-800 text-white  rounded-none`}
    >
      <div className="p-1 text-center">
        <div className="relative flex justify-center items-center">
          {!collapsed && (
            <QueryStatsIcon className="absolute left-14 transform -translate-x-6 text-white" />
          )}
          <Typography
            variant="h6"
            color="white"
            className={`text-center ${collapsed ? "hidden" : ""}`}
          >
            Team Survey
          </Typography>
        </div>
      </div>
      {!collapsed && <hr className="mt-3 border-gray-700" />}
      <div className="text-center mt-3">
        <AccountBoxIcon
          style={{
            fontSize: "70px",
            visibility: collapsed ? "hidden" : "visible",
            color: "white",
          }}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-300 mt-1">Loading...</p>
      ) : userData.role === "Admin" ? (
        <div className="text-center mt-1">
          <p className="font-medium text-xs md:text-base text-center text-blue-300 ">
            {userData.username}
          </p>
          <p className="text-sm text-gray-400 text-center">{userData.role}</p>
        </div>
      ) : (
        <div className="font-medium text-xs md:text-base text-center text-teal-300 mt-1">
          <p className="text-gray-300">{userData.username}</p>
          <p className="text-xs text-gray-400 text-center">
            {userData.team} : {userData.role}
          </p>
        </div>
      )}

      {!collapsed && <hr className="my-4 border-gray-700" />}
      {!collapsed && (
        <List>
          <ListItem className="text-white hover:bg-gray-700" onClick={() => router.push("/dashboard")}>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem className="text-white hover:bg-gray-700" onClick={() => router.push("/checkID")}>
            <ListItemPrefix>
              <FactCheckIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            CheckID
          </ListItem>

          <ListItem className="text-white hover:bg-gray-700" onClick={() => router.push("/team")}>
            <ListItemPrefix>
              <GroupsIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Team
            <ListItemSuffix>
              <Chip
                value={userData.team || "N/A"}
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full bg-gray-600 text-white"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem className="text-white hover:bg-gray-700" onClick={() => router.push("/profile")}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Profile
          </ListItem>

          <ListItem className="text-white hover:bg-gray-700" onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      )}
    </Card>
  );
}
