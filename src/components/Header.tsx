import Link from "next/link";
import { FaInstagram } from 'react-icons/fa';
import {MdEmail, MdPerson} from "react-icons/md";

export function Header() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 md:py-10 bg-transparent gap-4 md:gap-0">
            <div className="flex items-center gap-2 cursor-pointer mt-2 md:mt-0">
                <div className="flex items-center">
                    <span className="text-2xl md:text-4xl font-bold tracking-tight text-white whitespace-nowrap">Productions Beaulieu</span>
                </div>
            </div>

            <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                <Link href="/" className="text-white hover:text-red-600 font-semibold transition uppercase text-[10px] md:text-xs tracking-[0.2em]">Accueil</Link>
                <Link href="/book" className="text-white hover:text-red-600 font-semibold transition uppercase text-[10px] md:text-xs tracking-[0.2em]">Réservez</Link>
                <Link href="/contact" className="text-white hover:text-red-600 font-semibold transition uppercase text-[10px] md:text-xs tracking-[0.2em]">Nous-contacter</Link>
                <Link href="/about-us" className="text-white hover:text-red-600 font-semibold transition uppercase text-[10px] md:text-xs tracking-[0.2em]">À propos</Link>
            </nav>

            <div className="flex items-center gap-5">
                <Link href="mailto:productionsbeaulieu@gmail.com" target="_blank"  className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <MdEmail size={14} />
                </Link>
                <Link href="https://www.instagram.com/productions_beaulieu/" target="_blank" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <FaInstagram size={16} />
                </Link>
                <Link href="/account" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <MdPerson size={16} />
                </Link>
            </div>
        </header>
    );
}