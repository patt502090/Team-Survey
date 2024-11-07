"use client";

import CardDataStats from "@/components/Dashboard/CardData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import GroupsIcon from "@mui/icons-material/Groups";
import { BreadcrumbsWithIcon } from "../../../components/Dashboard/Breadcrumbs";
import { ControlledSelect } from "../../../components/Dashboard/FilterSelect";
import LineChartCustom from "@/components/Charts/LineChart";
import PieChartCustom from "@/components/Charts/PieChart";
export default function Dashboard() {
  return (
    <main className="flex-1 p-6 space-y-6">
    <div className="mb-6">
      <BreadcrumbsWithIcon />
    </div>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
      <ControlledSelect />
    </div>

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
          <GroupsIcon />
        </CardDataStats>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
        <LineChartCustom/>
        <PieChartCustom/>
      </div>
  </main>

     
  );
}
