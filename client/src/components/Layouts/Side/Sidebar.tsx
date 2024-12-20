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
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { ModalLogout } from "@/components/Others/ModalLogout";
import axios from "axios";
export default function DefaultSidebar() {
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  // console.log("this", user);
  const handleOpen = () => setOpen(!open);


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const router = useRouter();
  // const handleLogout = () => {
  //   logout();
  //   router.push("/login");
  // };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const result = await ax.get(`${conf.jwtUserEndpoint}`);
  //       console.log("pp",result.data);
  //       setUserData({
  //         username: result.data.username,
  //         role: result.data.data.role.name,
  //         team: result.data.data.team.TeamName || "N/A",
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);
  const [image,setImage] = useState(null)
  const fetchImageuser = async() => {
    try{
      const token = sessionStorage.getItem("auth.jwt")
      const response = await axios.get(`http://localhost:1337/api/users/me?populate=*`, {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });
      setImage(response.data);
    }catch(error){
      console.log('error fetchImageuser',error);
    }
  }

  console.log("user",user);

  useEffect(() => {
    fetchImageuser()
  }, [])

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
      <div className="text-center mt-3  flex justify-center items-center">
        {/* <AccountBoxIcon
          style={{
            fontSize: "70px",
            visibility: collapsed ? "hidden" : "visible",
            color: "white",
          }}
        /> */}
        <img
          className="w-[100px] h-[100px] rounded-full border-4 border-white p-[2px] shadow-md mb-4"
          src={`http://localhost:1337${image?.picture?.url}`}
          alt="Profile illustration"
        />
      </div>
      {user?.role?.name === "Admin" ? (
        <div className="text-center mt-1">
          <p className="font-medium text-xs md:text-base text-center text-blue-300 ">
            {user?.username}
          </p>
          <p className="text-sm text-gray-400 text-center">
            {user?.role?.name}
          </p>
        </div>
      ) : (
        <div className="font-medium text-xs md:text-base text-center text-teal-300 mt-1">
          <p className="text-gray-300">{user?.username}</p>
          <p className="text-xs text-gray-400 text-center">
            {user?.my_team?.TeamName || user?.team?.TeamName || "N/A"} :{" "}
            {user?.role?.name}
          </p>
        </div>
      )}

      {!collapsed && <hr className="my-4 border-gray-700" />}
      {!collapsed && (
        <List>
          <ListItem
            className="text-white hover:bg-gray-700"
            onClick={() => router.push("/dashboard")}
          >
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            แดชบอร์ด
          </ListItem>
          <ListItem
            className="text-white hover:bg-gray-700"
            onClick={() => router.push("/checkid")}
          >
            <ListItemPrefix>
              <FactCheckIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            ตรวจสอบบัตร
          </ListItem>
          <ListItem
            className="text-white hover:bg-gray-700"
            onClick={() => router.push("/survey")}
          >
            <ListItemPrefix>
              <CenterFocusWeakIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            สแกนบัตร
            <ListItemSuffix></ListItemSuffix>
          </ListItem>
          <ListItem
            className="text-white hover:bg-gray-700"
            onClick={() => router.push("/team")}
          >
            <ListItemPrefix>
              <GroupsIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            ทีม
            <ListItemSuffix>
              <Chip
                value={user?.my_team?.TeamName || user?.team?.TeamName || "N/A"}
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full bg-gray-600 text-white"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem
            className="text-white hover:bg-gray-700"
            onClick={() => router.push("/profile")}
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            โปรไฟล์
          </ListItem>

          <ListItem
            className="text-white hover:bg-gray-700"
            onClick={handleOpen}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            ออกจากระบบ
          </ListItem>
        </List>
      )}
      <ModalLogout open={open} handleOpen={handleOpen} />
    </Card>
  );
}
