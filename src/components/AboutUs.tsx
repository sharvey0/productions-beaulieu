'use client';

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Category} from "@/types/Category";
import {loadAllCategories} from "@/database/CategoryDAO";

export function AboutUs() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await loadAllCategories();
            if (data) {
                setCategories(data.slice(0, 4));
            }
        };
        void fetchCategories();
    }, []);

    const staticImages = [
        "/img/jazz.jpg",
        "/img/pop.jpg",
        "/img/noel.jpg",
        "/img/jeux_video.jpg"
    ];

    return (
        <section className="relative z-10 w-full bg-zinc-950 py-24 px-6 lg:px-12" id="about-us">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 group">
                        <Image
                            src="/img/jazz.jpg"
                            alt="À propos de nous"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            style={{objectFit: 'cover'}}
                            className="grayscale hover:grayscale-0 transition duration-700 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="flex flex-col space-y-8">
                        <div>
                            <h2 className="text-[var(--accent)] uppercase tracking-[0.3em] text-sm font-bold mb-4">Notre
                                Histoire</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                Redéfinir l&#39;expérience <span className="text-zinc-500">musicale.</span>
                            </h3>
                        </div>

                        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                            <p>
                                Fondé par des passionnés de la scène, Productions Beaulieu est né d&#39;une vision
                                simple :
                                connecter les meilleurs talents musicaux avec ceux qui recherchent une ambiance
                                exceptionnelle.
                            </p>
                            <p>
                                Que ce soit pour un mariage élégant, un événement corporatif d&#39;envergure ou une
                                soirée
                                intime, nous sélectionnons avec soin chaque artiste pour garantir une qualité sonore et
                                une présence scénique irréprochable.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-bold text-white">5+</p>
                                <p className="text-zinc-500 uppercase tracking-widest text-xs mt-1">Années
                                    d&#39;expérience</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">20+</p>
                                <p className="text-zinc-500 uppercase tracking-widest text-xs mt-1">Événements
                                    réussis</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32">
                    <h2 className="text-[var(--accent)] uppercase tracking-[0.3em] text-sm font-bold mb-12 text-center">Nos
                        Styles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, idx) => (
                            <Link key={category.id} href="/demo"
                                  className="relative h-64 group overflow-hidden rounded-xl border border-white/5">
                                <Image
                                    src={staticImages[idx % staticImages.length]}
                                    alt={category.label}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    style={{objectFit: 'cover'}}
                                    className="grayscale group-hover:grayscale-0 transition duration-500 group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white font-bold uppercase tracking-widest text-sm">{category.label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}