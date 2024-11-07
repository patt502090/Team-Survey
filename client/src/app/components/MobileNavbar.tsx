import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className="mb-3">
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeIcon sx={{ fontSize:27 }}/>}

      />
      <BottomNavigationAction
        label="CheckID"
        value="CheckID"
        icon={<SearchIcon sx={{ fontSize:27 }}/>}
      />
      <BottomNavigationAction
        // label="⠀"
        // value="⠀"
        icon={<DocumentScannerIcon sx={{ fontSize:27 }}/>}
        sx={{
            transform: "scale(1.3)",
          }}
      />
      <BottomNavigationAction
        label="Team"
        value="Team"
        icon={<GroupIcon sx={{ fontSize:27 }}/>}
      />
      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={<AccountBoxIcon sx={{ fontSize:27 }}/>}
      />
    </BottomNavigation>
  );
}
