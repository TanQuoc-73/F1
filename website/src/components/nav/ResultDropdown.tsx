import Link from "next/link";

export default function ResultDropdown() {
  return (
    <div className="absolute left-0 top-full mt-2 w-48 bg-black/90 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <ul className="py-2">
        <li>
          <Link
            href="/result/team-standing"
            className="block px-4 py-2 text-gray-200 hover:text-red-600 hover:bg-gray-800 transition-colors"
          >
            Team Standing
          </Link>
        </li>
        <li>
          <Link
            href="/result/driver-standing"
            className="block px-4 py-2 text-gray-200 hover:text-red-600 hover:bg-gray-800 transition-colors"
          >
            Driver Standing
          </Link>
        </li>
        <li>
          <Link
            href="/result/race-results"
            className="block px-4 py-2 text-gray-200 hover:text-red-600 hover:bg-gray-800 transition-colors"
          >
            Race Results
          </Link>
        </li>
        
        
        <li>
          <Link
            href="/result/season"
            className="block px-4 py-2 text-gray-200 hover:text-red-600 hover:bg-gray-800 transition-colors"
          >
            Season
          </Link>
        </li>
      </ul>
    </div>
  );
}