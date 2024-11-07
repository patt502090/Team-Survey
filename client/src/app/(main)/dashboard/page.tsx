"use client";
import DefaultSidebar from "../../../components/Sidebar";
import MobileNavbar from "../../../components/MobileNavbar";
import ResponsiveAppBar from "../../../components/AppBar";
import CardDataStats from "@/components/CardData";
import { BreadcrumbsWithIcon } from "../../../components/Breadcrumbs";
import { ControlledSelect } from "../../../components/FilterSelect";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import GroupsIcon from '@mui/icons-material/Groups';
export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Mobile AppBar */}
      <div className="md:hidden w-full">
        <ResponsiveAppBar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block  bg-white shadow-lg rounded-xl">
          <DefaultSidebar />
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <BreadcrumbsWithIcon />
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <ControlledSelect />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <CardDataStats
                title="Total views"
                total="$3.456K"
                rate="0.43%"
                levelUp
              >
                <PersonAddIcon />
              </CardDataStats>
              <CardDataStats
                title="Total Profit"
                total="$45,2K"
                rate="4.35%"
                levelUp
              >
                <QueryStatsIcon />
              </CardDataStats>
              <CardDataStats
                title="Total Product"
                total="2.450"
                rate="2.59%"
                levelUp
              >
                <TrackChangesIcon />
              </CardDataStats>
              <CardDataStats
                title="Total Users"
                total="3.456"
                rate="0.95%"
                levelDown
              >
               <GroupsIcon/>
              </CardDataStats>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navbar at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white shadow-lg">
        <MobileNavbar />
      </div>
    </div>
  );
}
