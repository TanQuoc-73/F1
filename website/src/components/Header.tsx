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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

  const navItems = [
    { href: "/new", label: "News" },
    { href: "/schedule", label: "Schedule", hasDropdown: true },
    { href: "/result", label: "Results", hasDropdown: true },
    { href: "/team", label: "Teams" },
    { href: "/driver", label: "Drivers" },
    { href: "/test", label: "Test" },
  ];

  return (
    <header
      className="w-full h-16 md:h-24 bg-black px-4 md:px-10 flex items-center justify-between fixed top-0 left-0 z-50 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* LOGO */}
      <Link href="/" className="flex items-center z-50">
        <Image 
          src="/img/logo.png" 
          alt="Logo" 
          width={80} 
          height={80} 
          className="rounded-full md:w-[125px] md:h-[125px]" 
        />
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8 ml-auto mr-10">
        {navItems.map((item) => (
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
      
      {/* Desktop Login/User */}
      <div className="hidden lg:block">
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
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden z-50 p-2 text-white hover:text-red-500 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40 overflow-y-auto`}
      >
        <div className="pt-20 px-6 pb-6">
          {/* Mobile Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 text-gray-200 hover:text-red-500 transition-colors font-medium text-lg py-3 ${
                      pathname === item.href ? "text-red-500" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.href ? null : item.href)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform duration-200 ${mobileDropdownOpen === item.href ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Mobile Dropdown Content */}
                {item.hasDropdown && mobileDropdownOpen === item.href && (
                  <div className="pl-4 py-2 space-y-2 border-l-2 border-red-500">
                    {item.href === "/schedule" && (
                      <>
                        <Link href="/schedule/races" className="block text-gray-400 hover:text-white py-2">
                          Races
                        </Link>
                        <Link href="/schedule/circuit" className="block text-gray-400 hover:text-white py-2">
                          Circuits
                        </Link>
                      </>
                    )}
                    {item.href === "/result" && (
                      <>
                        <Link href="/result/race-results" className="block text-gray-400 hover:text-white py-2">
                          Race Results
                        </Link>
                        <Link href="/result/driver-standing" className="block text-gray-400 hover:text-white py-2">
                          Driver Standings
                        </Link>
                        <Link href="/result/team-standing" className="block text-gray-400 hover:text-white py-2">
                          Team Standings
                        </Link>
                        <Link href="/result/season" className="block text-gray-400 hover:text-white py-2">
                          Seasons
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile User Section */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-400 flex items-center justify-center text-white font-bold">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-semibold">{user?.username}</span>
                </div>
                <Link href="/profile" className="block px-4 py-3 text-gray-200 hover:bg-gray-800 rounded transition-colors">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-3 text-gray-200 hover:bg-gray-800 rounded transition-colors">
                  Settings
                </Link>
                {role === "admin" && (
                  <Link href="/admin" className="block px-4 py-3 text-blue-400 hover:bg-blue-900 rounded transition-colors">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-900 rounded transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors font-semibold shadow"
              >
                SIGN IN
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
