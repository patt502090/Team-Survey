"use client";
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
export default function DefaultSidebar() {
  return (
    <Card className="h-screen w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
      <div className="p-1 text-center">
        <Typography variant="h6" color="blue-gray">
          Team Survey
        </Typography>
      </div>
      <hr className="mt-3"></hr>
      <div className="text-center mt-3">
        <AccountBoxIcon style={{ fontSize: "70px" }} />
      </div>
      <p className="text-center text-gray-700 mt-1">patt502090 : Worker</p>
      <div className="flex justify-center my-3">
        <Button size="sm" color="red" className="mr-2 flex items-center">
          <LogoutOutlinedIcon className="mr-1" />
          Sign Out
        </Button>
        <Button size="sm" color="blue" className="flex items-center">
          <PersonIcon className="mr-1" />
          Profile
        </Button>
      </div>
      <hr className="my-3"></hr>
      <List>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          E-Commerce
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
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
    </Card>
  );
}
