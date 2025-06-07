"use client";

import dynamic from "next/dynamic";

const TeamList = dynamic(() => import("@/components/TeamList"), { ssr: false });

export default function TeamPage() {
  return (
    <div className="min-h-screen p-4 mt-30">
      <TeamList />
    </div>
  );
}
