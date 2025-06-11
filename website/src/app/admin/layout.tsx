"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const sections = [
    { name: "Dashboard", href: "/admin" },
    { name: "Seasons", href: "/admin/seasons" },
    { name: "Races", href: "/admin/races" },
    { name: "Drivers", href: "/admin/drivers" },
    { name: "Teams", href: "/admin/teams" },
    { name: "Driver Standings", href: "/admin/driver-standings" },
    { name: "Team Standings", href: "/admin/team-standings" },
    { name: "News", href: "/admin/news" },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 min-h-screen fixed left-0 top-0">
        <div className="p-4">
          <Link href="/admin" className="text-white font-bold text-xl block mb-8">
            F1 Admin
          </Link>
          <nav className="space-y-2 mt-20">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(section.href)
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {section.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 