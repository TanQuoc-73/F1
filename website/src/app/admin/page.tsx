"use client";

import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Link from "next/link";

interface AdminSection {
  title: string;
  description: string;
  href: string;
}

const sections: AdminSection[] = [
  { title: "Team Management", description: "Manage F1 teams", href: "/admin/teams" },
  { title: "Team Standing Management", description: "Manage F1 teams standing", href: "/admin/team-standings" },
  { title: "Driver Standing Management", description: "Manage F1 drivers standing", href: "/admin/driver-standings" },
  // { title: "Schedule Management", description: "Manage race schedules", href: "/admin/schedules" },
  { title: "Race Management", description: "Manage race", href: "/admin/races" },
  { title: "Circuit Management", description: "Manage circuit", href: "/admin/circuit" },
  { title: "Driver Management", description: "Manage drivers", href: "/admin/drivers" },
  { title: "User Management", description: "Manage users and roles", href: "/admin/users" },
  { title: "News Management", description: "Publish and edit news", href: "/admin/news" },
  { title: "Settings", description: "Configure system preferences", href: "/admin/settings" },
];

export default function AdminPage() {
  return (
    <ProtectedAdminRoute>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="block bg-[#1a1a1a] border border-gray-700 hover:border-red-500 hover:shadow-red-500/20 text-white p-6 rounded-xl shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-400">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
