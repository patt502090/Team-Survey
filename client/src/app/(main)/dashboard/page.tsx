"use client";

import CardDataStats from "@/components/Dashboard/CardData/CardData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import GroupsIcon from "@mui/icons-material/Groups";
import { BreadcrumbsWithIcon } from "../../../components/Dashboard/Breadcrumbs";
import { ControlledSelect } from "../../../components/Dashboard/Filters/FilterSelect";
import LineChartCustom from "@/components/Dashboard/Charts/LineChart";
import PieChartCustom from "@/components/Dashboard/Charts/PieChart";
import DashboardStatsGrid from "@/components/Dashboard/Grid/DashboardStatsGrid";
import FilterListCustom from "@/components/Dashboard/Filters/FilterMap1";
import CardStats from "@/components/Dashboard/CardData/CardData1";
import FilterSelectionInterface from "@/components/Dashboard/Filters/FilterMapCustom";
import FilterTeamCustom from "@/components/Dashboard/Filters/FilterTeam";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import CustomerDistribution from "@/components/Dashboard/PieChartAndTable";
import FilterComponent from "@/components/Dashboard/Filters/ButtonFilterAll";

const Map = dynamic(() => import("@/components/Map/Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default function Dashboard() {
  return (
    <div className="flex flex-1">
      <aside className="hidden md:block w-64 bg-white shadow-lg">
        {/* Sidebar content goes here */}
      </aside>

      <main className="flex-1 p-6 space-y-6 md:ml-5">
        <div className="relative">
          <BreadcrumbsWithIcon pathName="แดชบอร์ด" />
        </div>
        <div className="">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            แดชบอร์ด
          </h1>
          {/* <ControlledSelect /> */}
          {/* <FilterTeamCustom/> */}
        </div>
        <FilterComponent />

        {/* <FilterListCustom/> */}
        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <CardDataStats title="Total Surveys Completed" total="3,456" rate="1.2%" levelUp bgColor="bg-blue-100" iconColor="text-blue-600">
            <PersonAddIcon />
          </CardDataStats>
          <CardDataStats title="Total Surveys Completed" total="1,980" rate="4.3%" levelUp bgColor="bg-blue-100" iconColor="text-blue-600">
            <QueryStatsIcon />
          </CardDataStats>
          <CardDataStats title="Total Surveys Completed" total="789" rate="2.1%" levelUp bgColor="bg-blue-100" iconColor="text-blue-600">
            <TrackChangesIcon />
          </CardDataStats>
          <CardDataStats title="Total Surveys Completed" total="54" rate="0.9%" levelDown bgColor="bg-blue-100" iconColor="text-blue-600">
            <GroupsIcon />
          </CardDataStats>
        </div> */}
        <CardStats />

        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
          <LineChartCustom />
          <PieChartCustom />
        </div> */}
        <CustomerDistribution />
        {/* <Map /> */}
      </main>
    </div>
  );
}
