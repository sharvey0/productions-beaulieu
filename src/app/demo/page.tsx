"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {DemoObject} from "@/types/DemoObject";
import {loadAllDemoAudioFiles} from "@/lib/supabase/bucket";
import {getDemoCategoryName} from "@/lib/supabase/utils";
import {Hero} from "@/components/HeroSection";
import * as React from "react";

export default function Demo() {
    const [groupedFiles, setGroupedFiles] = useState<
        Record<string, DemoObject[]>
    >({});
    const [loading, setLoading] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<string>("jeux_video");

    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            const files = await loadAllDemoAudioFiles();
            const grouped = (files || []).reduce(
                (acc, file) => {
                    acc[file.category] = acc[file.category] || [];
                    acc[file.category].push(file);
                    return acc;
                },
                {} as Record<string, DemoObject[]>,
            );

            setGroupedFiles(grouped);
            if (!cancelled) setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const categories: string[] = ["jeux_video", "noel", "jazz", "pop"];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const category of categories) {
                const element = sectionRefs.current[category];
                if (element) {
                    const {top, bottom} = element.getBoundingClientRect();
                    const absoluteTop = top + window.pageYOffset;
                    const absoluteBottom = bottom + window.pageYOffset;

                    if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
                        setActiveCategory(category);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [categories]);

    const scrollToCategory = (category: string) => {
        setActiveCategory(category);
        const element = sectionRefs.current[category];
        if (element) {
            const yOffset = -150;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header/>
            <Hero title="Nos Démos" subtitle="Découvrez notre univers musical à travers une sélection de nos meilleures performances." />

            {!loading && Object.keys(groupedFiles).length > 0 && (
                <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-y border-white/10 py-4">
                    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-4 md:gap-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => scrollToCategory(category)}
                                className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all ${
                                    activeCategory === category ? "text-[var(--accent)]" : "text-zinc-500 hover:text-white"
                                }`}
                            >
                                {getDemoCategoryName(category)}
                            </button>
                        ))}
                    </div>
                </nav>
            )}

            <main className="max-w-7xl mx-auto px-6 py-20 min-h-[40vh]">
                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]"></div>
                    </div>
                )}

                {!loading && groupedFiles && Object.keys(groupedFiles).length > 0 && (
                    <div className="space-y-32">
                        {categories.map((category: string) => (
                            <div
                                key={category}
                                ref={el => {
                                    sectionRefs.current[category] = el
                                }}
                                className="scroll-mt-40"
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider">
                                        {getDemoCategoryName(category)}
                                    </h2>
                                    <div className="flex-1 h-px bg-white/10"></div>
                                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(groupedFiles[category] || []).map((file: DemoObject) => (
                    <div 
                      key={file.name}
                      className="group bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-500"
                    >
                      <div className="flex flex-col sm:flex-row h-full">
                        <div className="relative w-full sm:w-40 h-48 sm:h-full bg-zinc-800 flex-shrink-0 overflow-hidden">
                          <Image
                            src={"/img/" + file.category + ".jpg"}
                            alt={file.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 160px"
                            style={{ objectFit: "cover" }}
                            className="grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between gap-6">
                          <div>
                            <p className="text-[var(--accent)] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Extrait Audio</p>
                            <h3 className="text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                              {file.name}
                            </h3>
                            <p className="text-zinc-400 text-xs mt-1">{new Date(file.created_at).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            })}</p>
                          </div>
                          <div className="audio-player-container">
                             <audio controls className="w-full h-10 accent-[var(--accent)]" src={file.url} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

                {!loading && (!groupedFiles || Object.keys(groupedFiles).length === 0) && (
                    <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                        <p className="uppercase tracking-widest">Aucun fichier trouvé</p>
                    </div>
                )}
            </main>

            <Footer/>
        </div>
    );
}
