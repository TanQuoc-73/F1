import Link from "next/link"
import { FaFlagCheckered } from "react-icons/fa"
import Image from "next/image"

export default function Header() {
    return (
        <header className="w-full bg-black shadow-md rounded-b-lg px-8 py-3 flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
                <Image src="/img/logo.png" alt="Logo" width={60} height={50} className="rounded-full" />
            </Link>
            {/* Navigation */}
            <nav className="flex gap-6">
                <Link href="/" className="text-gray-200 hover:text-red-600 transition-colors font-medium">Home</Link>
                <Link href="/about" className="text-gray-200 hover:text-red-600 transition-colors font-medium">About</Link>
                <Link href="/contact" className="text-gray-200 hover:text-red-600 transition-colors font-medium">Contact</Link>
            </nav>
            {/* Login */}
            <Link href="/login" className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors font-semibold shadow">
                Login
            </Link>
        </header>
    )
}