"use client"

// src/pages/DriverStandingAdminPage.tsx
import React, { useEffect, useState } from "react";

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  team?: {
    name: string;
  };
}

interface Season {
  id: number;
  year: number;
}

interface DriverStanding {
  id: number;
  driver: Driver;
  season: Season;
  points: number;
  position: number;
}

interface RaceResult {
  id: number;
  race: {
    id: number;
    season: Season;
  };
  driver: Driver;
  points: number;
}

const DriverStandingAdminPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [filterSeasonId, setFilterSeasonId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [driversRes, seasonsRes, standingsRes, resultsRes] = await Promise.all([
        fetch("http://localhost:8080/drivers"),
        fetch("http://localhost:8080/seasons"),
        fetch("http://localhost:8080/driver-standings"),
        fetch("http://localhost:8080/race-results")
      ]);

      const [driversData, seasonsData, standingsData, resultsData] = await Promise.all([
        driversRes.json(),
        seasonsRes.json(),
        standingsRes.json(),
        resultsRes.json()
      ]);

      setDrivers(driversData);
      setSeasons(seasonsData.sort((a: Season, b: Season) => b.year - a.year));
      setStandings(standingsData);
      setRaceResults(resultsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStandings = async (seasonId: number) => {
    setIsLoading(true);
    try {
      // Lọc kết quả theo mùa
      const seasonResults = raceResults.filter(
        result => result.race.season.id === seasonId
      );

      // Tính tổng điểm cho từng tay đua
      const driverPoints = seasonResults.reduce((acc, result) => {
        const driverId = result.driver.id;
        if (!acc[driverId]) {
          acc[driverId] = {
            driver: result.driver,
            points: 0
          };
        }
        acc[driverId].points += result.points;
        return acc;
      }, {} as Record<number, { driver: Driver; points: number }>);

      // Chuyển đổi thành mảng và sắp xếp theo điểm
      const sortedStandings = Object.values(driverPoints)
        .sort((a, b) => b.points - a.points)
        .map((standing, index) => ({
          driver: standing.driver,
          season: { id: seasonId },
          points: standing.points,
          position: index + 1
        }));

      // Cập nhật standings trong database
      for (const standing of sortedStandings) {
        const existingStanding = standings.find(
          s => s.driver.id === standing.driver.id && s.season.id === seasonId
        );

        if (existingStanding) {
          // Update existing standing
          await fetch(`http://localhost:8080/driver-standings/${existingStanding.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(standing)
          });
        } else {
          // Create new standing
          await fetch("http://localhost:8080/driver-standings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(standing)
          });
        }
      }

      // Refresh data
      await fetchData();
    } catch (error) {
      console.error("Error calculating standings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this standing?")) return;
    
    try {
      await fetch(`http://localhost:8080/driver-standings/${id}`, {
        method: "DELETE"
      });
      setStandings(standings.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting standing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Driver Standings Management</h1>
          <div className="flex items-center gap-4">
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded"
              value={filterSeasonId}
              onChange={(e) => setFilterSeasonId(e.target.value)}
            >
              <option value="">All Seasons</option>
              {seasons.map(s => (
                <option key={s.id} value={s.id}>{s.year}</option>
              ))}
            </select>
            {filterSeasonId && (
              <button
                onClick={() => calculateStandings(parseInt(filterSeasonId))}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
              >
                {isLoading ? "Calculating..." : "Calculate Standings"}
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left">Position</th>
                <th className="p-4 text-left">Driver</th>
                <th className="p-4 text-left">Team</th>
                <th className="p-4 text-left">Points</th>
                <th className="p-4 text-left">Season</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {standings
                .filter(s => !filterSeasonId || s.season.id.toString() === filterSeasonId)
                .map(s => (
                  <tr key={s.id} className="border-t border-gray-700 hover:bg-gray-700">
                    <td className="p-4">{s.position}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{s.driver.number}</span>
                        <span>{s.driver.firstName} {s.driver.lastName}</span>
                      </div>
                    </td>
                    <td className="p-4">{s.driver.team?.name || 'No Team'}</td>
                    <td className="p-4">{s.points}</td>
                    <td className="p-4">{s.season.year}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverStandingAdminPage;
