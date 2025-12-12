"use client"

import React, { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  team: Team;
}

interface Season {
  id: number;
  year: number;
}

interface TeamStanding {
  id: number;
  team: Team;
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
  team: Team;
  points: number;
}

interface DriverStanding {
  id: number;
  driver: Driver;
  season: Season;
  points: number;
  position: number;
}

const TeamStandingAdminPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [filterSeasonId, setFilterSeasonId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [teamsRes, seasonsRes, standingsRes, resultsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/teams`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/seasons`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/team-standings`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/race-results`)
      ]);

      const [teamsData, seasonsData, standingsData, resultsData] = await Promise.all([
        teamsRes.json(),
        seasonsRes.json(),
        standingsRes.json(),
        resultsRes.json()
      ]);

      setTeams(teamsData);
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
      // Lấy driver standings cho mùa giải
      const driverStandingsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/driver-standings`);
      const driverStandings: DriverStanding[] = await driverStandingsRes.json();
      
      // Lọc driver standings theo mùa
      const seasonDriverStandings = driverStandings.filter(
        (standing: DriverStanding) => standing.season.id === seasonId
      );

      // Nhóm tay đua theo team
      const teamDrivers = seasonDriverStandings.reduce((acc: Record<number, { team: Team; drivers: { driver: Driver; points: number }[] }>, standing: DriverStanding) => {
        const teamId = standing.driver.team.id;
        if (!acc[teamId]) {
          acc[teamId] = {
            team: standing.driver.team,
            drivers: []
          };
        }
        acc[teamId].drivers.push({
          driver: standing.driver,
          points: standing.points
        });
        return acc;
      }, {});

      // Tính điểm team dựa trên 2 tay đua có điểm cao nhất
      const teamStandings = Object.values(teamDrivers).map((team: { team: Team; drivers: { driver: Driver; points: number }[] }) => {
        // Sắp xếp tay đua theo điểm từ cao xuống thấp
        const sortedDrivers = team.drivers.sort((a: { points: number }, b: { points: number }) => b.points - a.points);
        // Lấy 2 tay đua có điểm cao nhất
        const topTwoDrivers = sortedDrivers.slice(0, 2);
        // Tính tổng điểm của 2 tay đua
        const totalPoints = topTwoDrivers.reduce((sum: number, driver: { points: number }) => sum + driver.points, 0);

        return {
          team: team.team,
          season: { id: seasonId },
          points: totalPoints,
          position: 0 // Sẽ được cập nhật sau khi sắp xếp
        };
      });

      // Sắp xếp team theo điểm và cập nhật vị trí
      const sortedStandings = teamStandings
        .sort((a, b) => b.points - a.points)
        .map((standing, index) => ({
          ...standing,
          position: index + 1
        }));

      // Cập nhật standings trong database
      for (const standing of sortedStandings) {
        const existingStanding = standings.find(
          s => s.team.id === standing.team.id && s.season.id === seasonId
        );

        if (existingStanding) {
          // Update existing standing
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/team-standings/${existingStanding.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(standing)
          });
        } else {
          // Create new standing
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/team-standings`, {
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
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/team-standings/${id}`, {
        method: "DELETE"
      });
      setStandings(standings.filter(s => s.id !== id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting standing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Team Standings Management</h1>
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
                <th className="p-4 text-left">Team</th>
                <th className="p-4 text-left">Points</th>
                <th className="p-4 text-left">Season</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {standings
                .filter(s => !filterSeasonId || s.season.id.toString() === filterSeasonId)
                .sort((a, b) => b.points - a.points)
                .map((s, index) => (
                  <tr key={s.id} className="border-t border-gray-700 hover:bg-gray-700 group">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{s.team.name}</td>
                    <td className="p-4">{s.points}</td>
                    <td className="p-4">{s.season.year}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setDeleteConfirmId(s.id)}
                        className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this standing? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamStandingAdminPage;

