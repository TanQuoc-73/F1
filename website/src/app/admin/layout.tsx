"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";

interface AdminSection {
  title: string;
  href: string;
  icon?: string;
}

const sections: AdminSection[] = [
  { title: "Team", href: "/admin/team" },
  { title: "Teams", href: "/admin/teams" },
  { title: "Team Standings", href: "/admin/team-standings" },
  { title: "Driver Standings", href: "/admin/driver-standings" },
  { title: "Races", href: "/admin/races" },
  { title: "Circuits", href: "/admin/circuit" },
  { title: "Drivers", href: "/admin/drivers" },
  { title: "Users", href: "/admin/users" },
  { title: "News", href: "/admin/news" },
  { title: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <ProtectedAdminRoute>
      <div className="min-h-screen bg-gray-900">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full text-left mb-6"
            >
              <h1 className={`font-bold ${isSidebarOpen ? "text-xl" : "text-lg"}`}>
                {isSidebarOpen ? "Admin Panel" : "AP"}
              </h1>
            </button>
            <nav className="space-y-2">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    pathname === section.href
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className={isSidebarOpen ? "ml-2" : "mx-auto"}>
                    {isSidebarOpen ? section.title : section.title.charAt(0)}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <main className="p-8">{children}</main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
} 