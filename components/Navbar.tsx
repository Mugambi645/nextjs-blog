import Link from "next/link"

export default function Navbar() {
    return (
        <nav>
            <div className="container">
                <Link href="/">Home</Link>
                <Link href="/blogs">Blog</Link>
            </div>
        </nav>
    )
}