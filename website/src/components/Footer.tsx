export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0">© 2025 F1 News. All rights reserved.</p>
                    <nav className="flex gap-6">
                        <a href="/privacy" className="text-sm hover:text-red-400 transition-colors">Privacy Policy</a>
                        <a href="/terms" className="text-sm hover:text-red-400 transition-colors">Terms of Service</a>
                        <a href="/contact" className="text-sm hover:text-red-400 transition-colors">Contact Us</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}