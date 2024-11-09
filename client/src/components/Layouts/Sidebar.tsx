"use client";
import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Button,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import GroupsIcon from "@mui/icons-material/Groups";
import ax, { axData } from "@/conf/ax";
import conf from "@/conf/main";

export default function DefaultSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    role: "",
    team: "",
  });
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Fetch user data on component mount
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
      className={`h-screen w-full transition-all duration-300 shadow-xl shadow-blue-gray-900/5 p-4 fixed ${
        collapsed ? "max-w-[4rem]" : "max-w-[17rem]"
      }`}
    >
      <div className="p-1 text-center">
        <div className="relative flex justify-center items-center">
          {!collapsed && (
            <QueryStatsIcon className="absolute left-14 transform -translate-x-6" />
          )}
          <Typography
            variant="h6"
            color="blue-gray"
            className={`text-center ${collapsed ? "hidden" : ""}`}
          >
            Team Survey
          </Typography>
        </div>
      </div>
      {!collapsed && <hr className="my-3" />}
      <div className="text-center mt-3">
        <AccountBoxIcon
          style={{
            fontSize: "70px",
            visibility: collapsed ? "hidden" : "visible",
          }}
        />
      </div>

      {/* Display user information conditionally based on role */}
      {loading ? (
        <p className="text-center text-gray-700 mt-1">Loading...</p>
      ) : userData.role === "Admin" ? (
        <div className="text-center mt-1">
          <p className="font-medium text-xs md:text-base text-center text-blue-600 ">
            {userData.username}
          </p>
          <p className="text-sm text-gray-500 text-center">{userData.role}</p>
        </div>
      ) : (
        <div className="font-medium text-xs md:text-base text-center text-teal-500  mt-1">
          <p className="text-gray-700">{userData.username}</p>
          <p className="text-xs text-gray-500 text-center0">
            {userData.team} : {userData.role}
          </p>
        </div>
      )}

      <div className="flex justify-center my-3">
        {!collapsed && (
          <>
            <Button
              size="sm"
              color="red"
              className="mr-2 flex items-center px-2 py-1 text-xs"
              style={{ minHeight: "2.2rem", minWidth: "5rem" }}
            >
              <LogoutOutlinedIcon
                className="mr-1"
                style={{ fontSize: "16px" }}
              />{" "}
              Sign Out
            </Button>
            <Button
              size="sm"
              color="blue"
              className="flex items-center px-2 py-1 text-xs"
              style={{ minHeight: "2.2rem", minWidth: "5rem" }}
            >
              <PersonIcon className="mr-1" style={{ fontSize: "16px" }} />{" "}
              Profile
            </Button>
          </>
        )}
      </div>
      {!collapsed && <hr className="my-3" />}
      {!collapsed && (
        <List>
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PersonIcon className="h-5 w-5" />
            </ListItemPrefix>
            User
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <GroupsIcon className="h-5 w-5" />
            </ListItemPrefix>
            Team
            <ListItemSuffix>
              <Chip
                value={userData.team || "N/A"}
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      )}
    </Card>
  );
}
