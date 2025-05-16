import React, { useState } from "react";
import cropData from "./cropData.json";

export default function GardenPlannerApp() {
  const [zone, setZone] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredCrops, setFilteredCrops] = useState([]);

  const handleSearch = () => {
    const zonePattern = new RegExp(`Zone[\s]*${zone}`, "i");

    const results = cropData.filter((crop) => {
      const zoneMatch =
        zone === "" || zonePattern.test(crop.Grow_Zones);
      const categoryMatch =
        category === "all" || crop.Type.toLowerCase() === category.toLowerCase();
      return zoneMatch && categoryMatch;
    });

    const sorted = results.sort((a, b) => {
      const aDays = parseInt(a.Days_to_Germination);
      const bDays = parseInt(b.Days_to_Germination);
      return aDays - bDays;
    });

    setFilteredCrops(sorted);
  };

  const formatZones = (zones) => {
    const numbers = zones.match(/\d+/g);
    return numbers ? numbers.join(", ") : zones;
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h1>🌱 Little Dibby Garden Planner</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Enter Your Grow Zone (e.g., 7):
          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Select Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="all">All</option>
            <option value="flower">Flowers</option>
            <option value="herb">Herbs</option>
            <option value="vegetable">Vegetables</option>
          </select>
        </label>
      </div>
      <button onClick={handleSearch}>Find Crops</button>

      {filteredCrops.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>🌼 Recommended Crops</h2>
          <ul>
            {filteredCrops.map((crop, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <strong>{crop.Crop}</strong> ({crop.Type})<br />
                🌱 Sow Indoors: {crop.Sow_Indoors}<br />
                🌿 Sow Outdoors: {crop.Sow_Outdoors}<br />
                ⏱ Days to Germination: {crop.Days_to_Germination}<br />
                🍅 Days to Harvest: {crop.Days_to_Harvest}<br />
                📍 Grow Zones: {formatZones(crop.Grow_Zones)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
