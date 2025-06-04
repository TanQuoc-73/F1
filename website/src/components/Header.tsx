"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ScheduleDropdown from "./nav/ScheduleDropdown";


export default function Header() {
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 1, 0.01);
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
          { href: "/result", label: "Result" },
          { href: "/team", label: "Teams" },
          { href: "/driver", label: "Drivers" },
        ].map((item) => (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className={`relative text-gray-200 hover:text-red-600 transition-colors font-medium text-lg ${
                pathname === item.href ? "text-red-600 sparkles" : ""
              }`}
            >
              {item.label}
              {pathname === item.href && <div className="sparkles-container">{generateSparks()}</div>}
            </Link>
            {item.hasDropdown && <ScheduleDropdown />}
          </div>
        ))}
      </nav>
      {/* Login */}
      <Link
        href="/login"
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors font-semibold shadow"
      >
        Login
      </Link>
    </header>
  );
}