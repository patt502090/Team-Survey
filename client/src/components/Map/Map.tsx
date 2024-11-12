import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FeatureCollection } from "geojson";

interface GeoFeature {
  type: "Feature";
  properties: {
    pro_th?: string;
    amp_th?: string;
    tam_th?: string;
  };
  geometry: any;
}

interface GeoData extends FeatureCollection {
  features: GeoFeature[];
}

const Map = () => {
  const [currentLayer, setCurrentLayer] = useState<"provinces" | "districts" | "subdistricts">("provinces");
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string | null>(null);

  const loadGeoData = useCallback(async () => {
    try {
      let layer: string;
      if (currentLayer === "provinces") {
        layer = "provinces";
      } else if (currentLayer === "districts" && selectedProvince) {
        layer = "districts";
      } else if (currentLayer === "subdistricts" && selectedDistrict) {
        layer = "subdistricts";
      } else {
        return;
      }

      const response = await fetch(`http://localhost:3000/${layer}.geojson`);
      if (!response.ok) {
        throw new Error(`Failed to load ${layer}.geojson`);
      }
      const data: GeoData = await response.json();

      if (currentLayer === "districts" && selectedProvince) {
        setGeoData({
          ...data,
          features: data.features.filter(
            (feature) => feature.properties.pro_th === selectedProvince
          ),
        });
      } else if (currentLayer === "subdistricts" && selectedDistrict) {
        setGeoData({
          ...data,
          features: data.features.filter(
            (feature) => feature.properties.amp_th === selectedDistrict
          ),
        });
      } else {
        setGeoData(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(`Error loading data: ${error.message}`);
      } else {
        console.error("An unknown error occurred");
        alert("Error loading data: An unknown error occurred");
      }
    }
  }, [currentLayer, selectedProvince, selectedDistrict]);

  useEffect(() => {
    loadGeoData();
  }, [loadGeoData]);

  const handleClick = async (
    e: any,
    nextLayer: "districts" | "subdistricts",
    name: string
  ) => {
    if (nextLayer === "districts") {
      setSelectedProvince(name);
      setSelectedDistrict(null);
      setSelectedSubDistrict(null);
    } else if (nextLayer === "subdistricts") {
      setSelectedDistrict(name);
      setSelectedSubDistrict(null);
    } else {
      setSelectedSubDistrict(name);
    }

    setCurrentLayer(nextLayer);
    await loadGeoData();
  };

  const handleBack = async () => {
    setCurrentLayer((prevLayer) => {
      if (prevLayer === "subdistricts") {
        setSelectedSubDistrict(null);
        return "districts";
      }
      if (prevLayer === "districts") {
        setSelectedDistrict(null);
        return "provinces";
      }
      setSelectedProvince(null);
      return "provinces";
    });

    await loadGeoData();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-end mb-4"></div>
      <div className="mb-4">
        <p>Selected Province: {selectedProvince || "None"}</p>
        <p>Selected District: {selectedDistrict || "None"}</p>
        <p>Selected Subdistrict: {selectedSubDistrict || "None"}</p>
      </div>
      <MapContainer
        key={`${currentLayer}-${selectedProvince}-${selectedDistrict}-${selectedSubDistrict}`}
        center={[13.736717, 100.523186]}
        zoom={6}
        style={{ height: "400px", width: "600px" }}
        className="border border-gray-300 rounded-lg"
        whenCreated={(map) => {
          map.on('load', () => {
            console.log('Map loaded!');
          });
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoData ? (
          <GeoJSON
            key={currentLayer}
            data={geoData}
            onEachFeature={(feature, layer) => {
              layer.on("click", (e) => {
                if (currentLayer === "provinces") {
                  handleClick(e, "districts", feature.properties.pro_th || "");
                } else if (currentLayer === "districts") {
                  handleClick(
                    e,
                    "subdistricts",
                    feature.properties.amp_th || ""
                  );
                } else if (currentLayer === "subdistricts") {
                  setSelectedSubDistrict(feature.properties.tam_th || "");
                }
              });
            }}
          />
        ) : (
          <div>Loading map data...</div>
        )}
      </MapContainer>
      
      ) : (
        <div>Loading map data...</div>
      )}
    </div>
  );
};

export default Map;
