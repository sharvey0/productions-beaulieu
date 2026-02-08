import Link from "next/link";
import {FaInstagram} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="relative z-10 w-full bg-black border-t border-white/10 py-16 px-6 lg:px-12 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo/prod_beaulieu_logo.png"
                                alt="Logo"
                                width={200}
                                height={54}
                                className="w-48 brightness-100"
                            />
                        </Link>
                        <p className="text-zinc-500 max-w-sm leading-relaxed">
                            Services de musique professionnels pour vos événements.
                            Nous créons l&#39;ambiance parfaite pour vos moments inoubliables.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navigation</h4>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Accueil</Link>
                            </li>
                            <li><Link href="/book"
                                      className="hover:text-[var(--accent)] transition-colors">Réservez</Link></li>
                            <li><Link href="/contact"
                                      className="hover:text-[var(--accent)] transition-colors">Contactez-nous</Link>
                            </li>
                            <li><Link href="/#about-us" className="hover:text-[var(--accent)] transition-colors">À
                                propos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
                        <div className="space-y-4">
                            <div className="flex gap-4 pt-2">
                                <Link
                                    href="https://www.instagram.com/productions_beaulieu/"
                                    target="_blank"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    <FaInstagram size={18}/>
                                </Link>
                                <Link
                                    href="https://www.instagram.com/productions_beaulieu/"
                                    target="_blank"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    <MdEmail size={18}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="border-t border-white/5 pt-8 font-semibold flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 uppercase tracking-[0.2em]">
                    <p>© {new Date().getFullYear()} Productions Beaulieu — Tous droits réservés.</p>
                    <p>
                        Fait avec passion par {" "}
                        <a
                            href="https://github.com/sharvey0"
                            className="underline underline-offset-2 hover:text-[var(--accent)] transition-colors"
                            target="_blank"
                        >
                            Samuel Harvey
                        </a>
                        {" et "}
                        <a
                            href="https://github.com/edupont16"
                            className="underline underline-offset-2 hover:text-[var(--accent)] transition-colors"
                            target="_blank"
                        >
                            Édouard Dupont
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}