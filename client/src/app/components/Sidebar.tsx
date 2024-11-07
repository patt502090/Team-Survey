"use client";
import { useState } from "react";
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
import GroupsIcon from '@mui/icons-material/Groups';
export default function DefaultSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Card
      className={`h-screen w-full transition-all duration-300 p-4 shadow-xl shadow-blue-gray-900/5 ${
        collapsed ? "max-w-[4rem]" : "max-w-[17rem]"
      }`}
    >
      <div className="p-1 text-center">
        <div className="relative flex justify-center items-center">
          {!collapsed && (
            <QueryStatsIcon className="absolute left-14 transform -translate-x-6" />
          )}
          {/* Centered Title */}
          <Typography
            variant="h6"
            color="blue-gray"
            className={`text-center ${collapsed ? "hidden" : ""}`}
          >
            Team Survey
          </Typography>
        </div>
      </div>
      <hr className="mt-3" />
      <div className="text-center mt-3">
        <AccountBoxIcon
          style={{
            fontSize: "70px",
            visibility: collapsed ? "hidden" : "visible",
          }}
        />
      </div>
      <p
        className={`text-center text-gray-700 mt-1 ${
          collapsed ? "hidden" : ""
        }`}
      >
        Team12 : Worker
      </p>
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
      <hr className="my-3" />
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
                value="14"
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
      <Button
        onClick={toggleSidebar}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 mt-10"
      >
        {collapsed ? <KeyboardDoubleArrowRightIcon /> : "Collapse"}
      </Button>
    </Card>
  );
}
