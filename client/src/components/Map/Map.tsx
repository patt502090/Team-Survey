"use client";
import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FeatureCollection } from "geojson";
import { Path } from "leaflet";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import { SubDistrictData } from "@/modules/subDistrictDataSchema";
import { RegionData } from "@/modules/regionDataSchema";
import { DistrictData } from "@/modules/districtDataSchema";
import { ProvinceData } from "@/modules/provinceDataSchema";
import { GeoData } from "@/modules/geoDataSchema";

const Map = () => {
  const [currentLayer, setCurrentLayer] = useState<
    "region" | "provinces" | "districts" | "subdistricts"
  >("region");
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<{
    id: number | null;
    name: string | null;
  } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{
    id: number | null;
    name: string | null;
  } | null>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<{
    id: number | null;
    name: string | null;
  } | null>(null);

  const [regionData, setRegionData] = useState<RegionData | null>(null);
  const [provinceData, setProvinceData] = useState<ProvinceData | null>(null);
  const [districtData, setDistrictData] = useState<DistrictData | null>(null);
  const [subDistricData, setSubDistrictData] = useState<SubDistrictData | null>(
    null
  );

  const regionMapping: { [key: string]: string } = {
    North: "ภาคเหนือ",
    Central: "ภาคกลาง",
    Northeast: "ภาคตะวันออกเฉียงเหนือ",
    West: "ภาคตะวันตก",
    East: "ภาคตะวันออก",
    South: "ภาคใต้",
  };

  const loadRegionData = useCallback(async () => {
    try {
      const requestData = {
        data: {
          team_id: null,
        },
      };

      const response = await ax.post(
        `${conf.apiUrlPrefix}/check_estimate_all_T`,
        requestData
      );

      console.log("Region data from API:", response.data);

      setRegionData(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }, []);

  const loadProvinceDataByRegion = useCallback(async (regionId: string) => {
    try {
      const regionName = regionMapping[regionId];
      const requestData = {
        data: {
          Region_id: regionName,
          team_id: null,
        },
      };

      const response = await ax.post<ProvinceData>(
        `${conf.apiUrlPrefix}/check_estimate_R_T`,
        requestData
      );

      console.log(
        `Provinceหำหด หเฟกเกเก  data for Region ${regionName}:`,
        response.data
      );

      return response.data.provinces || [];
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      return [];
    }
  }, []);
  const loadDistrictDataProvince = useCallback(async (ProvinceId: number) => {
    try {
      const requestData = {
        data: {
          Province_id: ProvinceId,
          team_id: null,
        },
      };
      console.log("oosdg requestData ", requestData);

      const response = await ax.post<DistrictData>(
        `${conf.apiUrlPrefix}/check_estimate_P_T`,
        requestData
      );

      console.log(`District data for Province ${ProvinceId}:`, response.data);
      console.log(
        `District data for Province asdadadadadaasdsdห ดหกดsdad ${ProvinceId}:`,
        response.data
      );

      return response.data.districts || [];
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      return [];
    }
  }, []);
  const loadSubDistrictDataByDistrict = useCallback(
    async (DistrictId: number) => {
      try {
        const requestData = {
          data: {
            district_id: DistrictId,
            team_id: null,
          },
        };

        const response = await ax.post<SubDistrictData>(
          `${conf.apiUrlPrefix}/check_estimate_D_T`,
          requestData
        );

        console.log(
          `SubDistrict data for District ${DistrictId}:`,
          response.data
        );

        return response.data.s_districts || [];
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
        }
        return [];
      }
    },
    []
  );

  const determineFillColor = (counts: {
    greenCount: number;
    yellowCount: number;
    redCount: number;
  }) => {
    let fillColor;

    if (
      counts.greenCount > counts.yellowCount &&
      counts.greenCount > counts.redCount
    ) {
      fillColor = "green";
    } else if (
      counts.yellowCount > counts.greenCount &&
      counts.yellowCount > counts.redCount
    ) {
      fillColor = "yellow";
    } else if (
      counts.redCount > counts.greenCount &&
      counts.redCount > counts.yellowCount
    ) {
      fillColor = "red";
    } else {
      fillColor = "white";
    }

    return fillColor;
  };

  const loadGeoData = useCallback(async () => {
    if (!regionData) {
      console.error("Region data is not available yet.");
      return;
    }

    try {
      let layer: string;
      if (currentLayer === "provinces" || currentLayer === "region") {
        layer = "provinces";
      } else if (
        currentLayer === "districts" &&
        selectedProvince?.name &&
        selectedProvince.id
      ) {
        layer = "districts";
      } else if (
        currentLayer === "subdistricts" &&
        selectedDistrict?.name &&
        selectedDistrict.id
      ) {
        layer = "subdistricts";
      } else {
        return;
      }

      const response = await fetch(`${conf.apiformap}${layer}.geojson`);
      if (!response.ok) {
        throw new Error(`Failed to load ${layer}.geojson`);
      }
      const data: GeoData = await response.json();

      console.log("Loaded Geo Data:", data);

      if (currentLayer === "provinces" && selectedRegion) {
        const provinceData =
          selectedRegion !== null
            ? await loadProvinceDataByRegion(selectedRegion)
            : [];

        if (provinceData.length === 0) {
          console.warn(`No province data found for region: ${selectedRegion}`);
        }

        setGeoData({
          ...data,
          features: data.features.filter((feature) => {
            const matchedProvince = provinceData.find(
              (province) => province.province === feature.properties.pro_th
            );

            const region = feature.properties
              .reg_royin as keyof typeof regionMapping;

            if (
              region !== selectedRegion ||
              !feature.properties.pro_th ||
              !matchedProvince?.id
            ) {
              return false;
            }

            if (!matchedProvince) {
              console.warn(
                `No matching province found in GeoJSON for: ${feature.properties.pro_th}`
              );
            }

            if (matchedProvince) {
              feature.properties.fillColor =
                determineFillColor(matchedProvince);
              feature.properties.pro_id = matchedProvince.id;
            }

            return matchedProvince;
          }),
        });
      } else if (currentLayer === "districts" && selectedProvince) {
        if (selectedProvince.id !== null && selectedProvince.name !== null) {
          const districtsData =
            selectedProvince.id !== null && selectedProvince.name !== null
              ? await loadDistrictDataProvince(selectedProvince.id)
              : [];

          console.log("นี่นะอำเภอ", districtsData);
          console.log("นี่นะจังหวัด", selectedProvince.name);
          console.log("นี่นะเลขจังหวัด", selectedProvince.id);

          setGeoData({
            ...data,
            features: data.features.filter((feature) => {
              const matchedDistrict = districtsData.find(
                (district) => district.district === feature.properties.amp_th
              );

              const province = feature.properties.pro_th;
              if (
                province !== selectedProvince.name ||
                !feature.properties.amp_th ||
                !matchedDistrict?.id
              ) {
                return false;
              }

              if (matchedDistrict) {
                feature.properties.fillColor =
                  determineFillColor(matchedDistrict);
                feature.properties.amp_id = matchedDistrict.id;
              }

              console.log("afaf matchedDistrict", matchedDistrict);

              return matchedDistrict;
            }),
          });
        } else {
          console.warn("Selected Province is invalid or not properly defined.");
        }
      } else if (currentLayer === "subdistricts" && selectedDistrict) {
        if (selectedDistrict.id !== null && selectedDistrict.name !== null) {
          const subdistrictsData = await loadSubDistrictDataByDistrict(
            selectedDistrict.id
          );

          console.log("นี่นะตำบล", subdistrictsData);
          console.log("นี่นะอำเภอ", selectedDistrict.name);

          setGeoData({
            ...data,
            features: data.features.filter((feature) => {
              const matchedSubDistrict = subdistrictsData.find(
                (subDistrict) =>
                  subDistrict.s_Districts === feature.properties.tam_th
              );

              const district = feature.properties.amp_th;
              if (district !== selectedDistrict.name) {
                return false;
              }

              if (matchedSubDistrict) {
                feature.properties.fillColor =
                  determineFillColor(matchedSubDistrict);
                feature.properties.tam_id = matchedSubDistrict.id;
              }

              return matchedSubDistrict;
            }),
          });
        } else {
          console.warn("Selected district is invalid or not properly defined.");
        }
      } else {
        const matchedGeoData = data.features.map((feature) => {
          const region = feature.properties
            .reg_royin as keyof typeof regionMapping;
          const regionName = regionMapping[region];
          const regionInfo = regionData.regions.find(
            (regionItem: any) => regionItem.Region === regionName
          );

          let fillColor = "gray";

          if (regionInfo) {
            fillColor = determineFillColor({
              greenCount: regionInfo.greenCount,
              yellowCount: regionInfo.yellowCount,
              redCount: regionInfo.redCount,
            });
          } else {
            console.warn(`Region ${regionName} not found in regionData`);
          }

          return {
            ...feature,
            properties: {
              ...feature.properties,
              fillColor,
            },
          };
        });

        console.log("Matched Geo Data:", matchedGeoData);

        setGeoData({
          ...data,
          features: matchedGeoData,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }, [
    regionData,
    provinceData,
    districtData,
    subDistricData,
    currentLayer,
    selectedRegion,
    selectedProvince,
    selectedDistrict,
  ]);

  useEffect(() => {
    const height = window.innerHeight;
    loadRegionData();
  }, [loadRegionData]);

  useEffect(() => {
    const height = window.innerHeight;
    if (currentLayer === "region" && regionData) {
      loadGeoData();
    } else if (currentLayer === "provinces" && selectedRegion) {
      loadGeoData();
    } else if (currentLayer === "districts" && selectedProvince) {
      loadGeoData();
    } else if (currentLayer === "subdistricts" && selectedDistrict) {
      loadGeoData();
    }
  }, [
    currentLayer,
    regionData,
    selectedRegion,
    selectedProvince,
    selectedDistrict,
  ]);

  const handleClick = async (
    e: any,
    nextLayer: "provinces" | "districts" | "subdistricts",
    name: string | null,
    id: number | null
  ) => {
    if (nextLayer === "provinces") {
      setSelectedRegion(name);
      setSelectedProvince(null);
      setSelectedDistrict(null);
      setSelectedSubDistrict(null);
    } else if (nextLayer === "districts") {
      setSelectedProvince({ id: id || null, name: name });
      setSelectedDistrict(null);
      setSelectedSubDistrict(null);
    } else if (nextLayer === "subdistricts") {
      setSelectedDistrict({ id: id || null, name: name });
      setSelectedSubDistrict(null);
    } else {
      setSelectedSubDistrict({ id: id || null, name: name });
    }

    setCurrentLayer(nextLayer);
    await loadGeoData();
  };
  const handleBack = () => {
    if (currentLayer === "subdistricts") {
      setSelectedSubDistrict(null);
      setCurrentLayer("districts");
    } else if (currentLayer === "districts") {
      setSelectedDistrict(null);
      setCurrentLayer("provinces");
    } else if (currentLayer === "provinces") {
      setSelectedProvince(null);
      setCurrentLayer("region");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-end mb-4"></div>
      <div className="mb-4">
        <p>Selected Region: {selectedRegion || "None"}</p>
        <p>
          Selected Province: {selectedProvince?.name || "None"}{" "}
          {selectedProvince?.id || "None"}
        </p>
        <p>
          Selected District: {selectedDistrict?.name || "None"}{" "}
          {selectedDistrict?.id || "None"}
        </p>
        <p>
          Selected Subdistrict: {selectedSubDistrict?.name || "None"}{" "}
          {selectedSubDistrict?.id || "None"}
        </p>
      </div>
      <button
        onClick={handleBack}
        disabled={currentLayer === "region"}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Back
      </button>
      <MapContainer
        key={`${currentLayer}-${selectedProvince}-${selectedDistrict}-${selectedSubDistrict}`}
        center={[13.736717, 100.523186]}
        zoom={6}
        style={{ height: "500px", width: "700px" }}
        className="border border-gray-300 rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoData && (
          <GeoJSON
            key={currentLayer}
            data={geoData}
            onEachFeature={(feature, layer) => {
              if (layer instanceof Path) {
                layer.setStyle({
                  weight: 1,
                  color: "black",
                  fillColor: feature.properties.fillColor || "white",
                  fillOpacity: 0.3,
                });
              }

              console.log("Feature properties:", feature.properties);

              layer.on("click", (e) => {
                if (currentLayer === "region") {
                  handleClick(
                    e,
                    "provinces",
                    feature.properties.reg_royin || null,
                    null
                  );
                } else if (currentLayer === "provinces") {
                  handleClick(
                    e,
                    "districts",
                    feature.properties.pro_th,
                    feature.properties.pro_id
                  );
                } else if (currentLayer === "districts") {
                  handleClick(
                    e,
                    "subdistricts",
                    feature.properties.amp_th,
                    feature.properties.amp_id
                  );
                } else if (currentLayer === "subdistricts") {
                  setSelectedSubDistrict({
                    id: feature.properties.tam_id,
                    name: feature.properties.tam_th || null,
                  });
                }
              });
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
