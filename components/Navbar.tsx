import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="border-b border-gray-100 bg-white">
            <div className="container mx-auto px-4 h-14 flex items-center gap-6">
                <Link href="/" className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    Home
                </Link>
                <Link href="/blogs" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                    Blog
                </Link>
            </div>
        </nav>
    )
}