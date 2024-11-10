import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import GroupIcon from "@mui/icons-material/Group";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useRouter } from "next/navigation";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className="mb-3 border-t-4"
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeIcon sx={{ fontSize: 27 }} />}
        onClick={() => {
          router.push("/dashboard");
        }}
      />

      <BottomNavigationAction
        label="CheckID"
        value="CheckID"
        icon={<SearchIcon sx={{ fontSize: 27 }} />}
        onClick={() => {
          router.push("/checkid");
        }}
      />

      <BottomNavigationAction
        // label="⠀"
        // value="⠀"
        icon={<DocumentScannerIcon sx={{ fontSize: 27 }} />}
        sx={{
          transform: "scale(1.3)",
        }}
        onClick={() => {
          router.push("/survey");
        }}
      />
      <BottomNavigationAction
        label="Team"
        value="Team"
        icon={<GroupIcon sx={{ fontSize: 27 }} />}
        onClick={() => {
          router.push("/team");
        }}
      />

      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={<AccountBoxIcon sx={{ fontSize: 27 }} />}
        onClick={() => {
          router.push("/profile");
        }}
      />
    </BottomNavigation>
  );
}
