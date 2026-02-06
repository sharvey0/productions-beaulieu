import Link from "next/link";
import { FaInstagram } from 'react-icons/fa';
import {MdEmail, MdPerson} from "react-icons/md";
import Image from "next/image";
import {HeaderProps} from "@/types/HeaderProps";

export function Header({ showOnlyLogo = false }: HeaderProps) {
    return (
        <header className="absolute top-0 left-0 w-full z-50 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-4 lg:py-10 bg-transparent gap-4 lg:gap-0">
            <Link href="/" className="flex items-center gap-2 cursor-pointer mt-2 lg:mt-0">
                <Image
                    src="/logo/prod_beaulieu_logo.png"
                    alt="Logo"
                    width={2000}
                    height={537}
                    sizes="20vw"
                    style={{ height: 'auto' }}
                    className="w-50"
                    unoptimized
                />
            </Link>

            {!showOnlyLogo &&
                <div className="flex flex-col lg:flex-row items-center">
                    <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                        <Link href="/" className="text-white hover:text-[var(--accent)] font-semibold transition-colors uppercase text-[10px] lg:text-xs tracking-[0.2em]">Accueil</Link>
                        <Link href="/book" className="text-white hover:text-[var(--accent)] font-semibold transition-colors uppercase text-[10px] lg:text-xs tracking-[0.2em]">Réservez</Link>
                        <Link href="/contact" className="text-white hover:text-[var(--accent)] font-semibold transition-colors uppercase text-[10px] lg:text-xs tracking-[0.2em]">Nous-contacter</Link>
                        <Link href="/#about-us" className="text-white hover:text-[var(--accent)] font-semibold transition-colors uppercase text-[10px] lg:text-xs tracking-[0.2em]">À propos</Link>
                    </nav>

                    <div className="flex items-center gap-5 lg:mt-0 mt-3">
                        <Link href="mailto:productionsbeaulieu@gmail.com" target="_blank"  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <MdEmail size={14} />
                        </Link>
                        <Link href="https://www.instagram.com/productions_beaulieu/" target="_blank" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <FaInstagram size={16} />
                        </Link>
                        <Link href="/account" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <MdPerson size={16} />
                        </Link>
                    </div>
                </div>
            }
        </header>
    );
}