"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ScheduleDropdown from "./nav/ScheduleDropdown";
import ResultDropdown from "./nav/ResultDropdown";
import AuthModal from "./AuthModal";
import { useAuthHook } from '../hooks/useAuth';

export default function Header() {
  const { user, isAuthenticated, handleLogout } = useAuthHook();
  const [authOpen, setAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 100, 0);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sparkles = [
    { left: "10%", delay: "0.1s", xOffset: "-10px" },
    { left: "20%", delay: "0.2s", xOffset: "8px" },
    { left: "30%", delay: "0.3s", xOffset: "-12px" },
    { left: "40%", delay: "0.25s", xOffset: "15px" },
    { left: "50%", delay: "0.4s", xOffset: "-5px" },
    { left: "60%", delay: "0.35s", xOffset: "10px" },
    { left: "70%", delay: "0.5s", xOffset: "-8px" },
    { left: "80%", delay: "0.45s", xOffset: "12px" },
    { left: "15%", delay: "0.6s", xOffset: "-15px" },
    { left: "25%", delay: "0.55s", xOffset: "5px" },
    { left: "35%", delay: "0.7s", xOffset: "-10px" },
    { left: "45%", delay: "0.65s", xOffset: "7px" },
  ];

  const generateSparks = () => {
    return sparkles.map((spark, index) => (
      <span
        key={index}
        className="sparkle"
        style={{
          left: spark.left,
          animationDelay: spark.delay,
          "--x-offset": spark.xOffset,
        } as React.CSSProperties}
      ></span>
    ));
  };

  return (
    <header
      className="w-full h-20 bg-black px-10 flex items-center justify-between fixed top-0 left-0 z-50 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* LOGO */}
      <Link href="/" className="flex items-center">
        <Image src="/img/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
      </Link>
      {/* Navigation */}
      <nav className="flex gap-6 ml-auto mr-10">
        {[
          { href: "/new", label: "News" },
          { href: "/schedule", label: "Schedule", hasDropdown: true },
          { href: "/result", label: "Results", hasDropdown: true },
          { href: "/team", label: "Teams" },
          { href: "/driver", label: "Drivers" },
        ].map((item) => (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className={`relative text-gray-200 hover:text-red-600 transition-colors font-medium text-s ${
                pathname === item.href ? "text-red-600 sparkles" : ""
              }`}
            >
              {item.label}
              {pathname === item.href && <div className="sparkles-container">{generateSparks()}</div>}
            </Link>
            {item.hasDropdown && <ScheduleDropdown />}
            {item.hasDropdown && item.href === "/result" && <ResultDropdown />}
          </div>
        ))}
      </nav>
      {/* Login/User */}
      {isAuthenticated ? (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow hover:scale-105 transition"
          >
            {user?.username.charAt(0).toUpperCase()}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg opacity-100 pointer-events-auto transition-opacity duration-200 z-50">
              <div className="px-4 py-2 text-gray-200 border-b border-gray-700">{user?.username}</div>
              <Link href="/profile" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 transition-colors">
                Profile
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 transition-colors">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white transition-colors rounded-b"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setAuthOpen(true)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors font-semibold shadow"
        >
          SIGN IN
        </button>
      )}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}