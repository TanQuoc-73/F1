"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import ScheduleDropdown from "./nav/ScheduleDropdown";
import ResultDropdown from "./nav/ResultDropdown";
import AuthModal from "./AuthModal";
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout, role } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 100, 0);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
      className="w-full h-24 bg-black px-10 flex items-center justify-between fixed top-0 left-0 z-50 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* LOGO */}
      <Link href="/" className="flex items-center">
        <Image src="/img/logo.png" alt="Logo" width={125} height={125} className="rounded-full" />
      </Link>
      
      {/* Navigation */}
      <nav className="flex gap-8 ml-auto mr-10">
        {[
          { href: "/new", label: "News" },
          { href: "/schedule", label: "Schedule", hasDropdown: true },
          { href: "/result", label: "Results", hasDropdown: true },
          { href: "/team", label: "Teams" },
          { href: "/driver", label: "Drivers" },
          { href: "/test", label: "Test" },
        ].map((item) => (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className={`relative text-gray-200 hover:text-red-600 transition-colors font-medium text-lg flex items-center gap-1 ${
                pathname === item.href ? "text-red-600 sparkles" : ""
              }`}
            >
              {item.label}
              {item.hasDropdown && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {pathname === item.href && <div className="sparkles-container">{generateSparks()}</div>}
            </Link>
            {item.hasDropdown && item.href === "/schedule" && <ScheduleDropdown />}
            {item.hasDropdown && item.href === "/result" && <ResultDropdown />}
          </div>
        ))}
      </nav>
      
      {/* Login/User */}
      {isAuthenticated ? (
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-red-600 to-orange-400 text-white font-semibold shadow hover:scale-105 transition"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm">{user?.username}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-56 bg-black border border-gray-700 rounded-lg shadow-lg opacity-100 pointer-events-auto transition-opacity duration-200 z-50"
            >
              <div className="px-4 py-3 text-gray-200 border-b border-gray-700 text-lg">{user?.username}</div>
              <Link href="/profile" className="block px-4 py-3 text-gray-200 hover:bg-gray-700 transition-colors text-lg">
                Profile
              </Link>
              <Link href="/settings" className="block px-4 py-3 text-gray-200 hover:bg-gray-700 transition-colors text-lg">
                Settings
              </Link>
              {role === "admin" && (
                <Link href="/admin" className="block px-4 py-3 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors text-lg">
                  Admin Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-600 hover:text-white transition-colors rounded-b text-lg"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setAuthOpen(true)}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors font-semibold shadow text-lg"
        >
          SIGN IN
        </button>
      )}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}