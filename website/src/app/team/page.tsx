"use client";

import dynamic from "next/dynamic";

// `use client` component phải import bằng dynamic nếu dùng từ server component
const TeamList = dynamic(() => import("@/components/TeamList"), { ssr: false });

export default function TeamPage() {
  return (
    <div className="min-h-screen p-4 mt-12">
      <TeamList />
    </div>
  );
}
