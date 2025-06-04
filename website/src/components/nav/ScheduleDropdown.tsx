import Link from "next/link";

export default function ScheduleDropdown() {
  return (
    <div className="absolute left-0 top-full mt-2 w-48 bg-black/90 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <ul className="py-2">
        <li>
          <Link
            href="/schedule/races"
            className="block px-4 py-2 text-gray-200 hover:text-red-600 hover:bg-gray-800 transition-colors"
          >
            Races
          </Link>
        </li>
        <li>
          <Link
            href="/schedule/circuit"
            className="block px-4 py-2 text-gray-200 hover:text-red-600 hover:bg-gray-800 transition-colors"
          >
            Circuit
          </Link>
        </li>
        <li>
          <Link
            href="/schedule/season"
            className="block px-4 py-2 text-gray-200 hover:text-red-600 hover:bg-gray-800 transition-colors"
          >
            Season
          </Link>
        </li>
      </ul>
    </div>
  );
}