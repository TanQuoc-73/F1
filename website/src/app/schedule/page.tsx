"use client";

import Link from "next/link";

const ScheduleOverview = () => {
  const races = [
    { round: 1, name: "Bahrain GP", date: "2025-03-02" },
    { round: 2, name: "Saudi GP", date: "2025-03-09" },
  ];

  const circuits = [
    { name: "Bahrain International Circuit", location: "Sakhir, Bahrain" },
    { name: "Jeddah Street Circuit", location: "Jeddah, Saudi Arabia" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
        Schedule Overview du lieu gia
      </h1>

      {/* RACES OVERVIEW */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Races</h2>
          <Link
            href="/schedule/races"
            className="text-sm text-red-500 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {races.map((race) => (
            <div
              key={race.round}
              className="bg-gray-900 p-4 rounded-md border border-gray-700"
            >
              <div className="flex justify-between">
                <span>Round {race.round}</span>
                <span>{race.date}</span>
              </div>
              <h3 className="text-lg font-semibold mt-1">{race.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CIRCUITS OVERVIEW */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Circuits</h2>
          <Link
            href="/schedule/circuit"
            className="text-sm text-red-500 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {circuits.map((circuit, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-4 rounded-md border border-gray-700"
            >
              <h3 className="text-lg font-semibold">{circuit.name}</h3>
              <p className="text-sm text-gray-400">{circuit.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScheduleOverview;
