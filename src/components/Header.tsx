import Link from "next/link";

export function Header() {
    return (
        <header className="w-screen bg-white shadow-md px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">P</div>
                <span className="text-2xl font-semibold text-gray-800">Placeholder</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Évènements</Link>
                <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Rendez-vous</Link>
                <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Contactez-nous</Link>
            </nav>
        </header>
    );
}