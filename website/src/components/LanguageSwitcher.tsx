"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === "en" ? "vi" : "en")}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-all duration-200 group hover:scale-105"
        aria-label="Switch language"
      >
        <div className="relative w-6 h-4 rounded overflow-hidden shadow-sm">
          <Image
            src={language === "en" ? "https://flagcdn.com/gb.svg" : "https://flagcdn.com/vn.svg"}
            alt={language === "en" ? "English" : "Tiếng Việt"}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {language === "en" ? "EN" : "VI"}
        </span>
      </button>
    </div>
  );
}
