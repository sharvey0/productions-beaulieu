'use client';

import Image from "next/image";
import {Header} from "@/components/Header";
import Link from "next/link";
import {AboutUs} from "@/components/AboutUs";
import {Footer} from "@/components/Footer";
import {useEffect, useState} from "react";
import {MdPause, MdPhoto, MdPlayArrow} from "react-icons/md";
import {getLastDemo} from "@/database/DemoDAO";
import {Demo} from "@/types/Demo";

export default function Home() {
    const emptyDemo: Demo = {
        id: 0,
        audio_url: "",
        category: "",
        created_at: "",
        img_url: "",
        name: "Inconnue"
    }
    const [demo, setDemo] = useState<Demo>(emptyDemo);
    const [loading, setLoading] = useState<boolean>(true);
    const [playing, setPlaying] = useState<boolean>(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);

            const data = await getLastDemo();

            setDemo({
                ...data,
                created_at: new Date(data.created_at).toLocaleDateString("fr-CA", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })
            });

            if (!cancelled) setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    function onPlay() {
        const audioElement = document.querySelector("audio");

        if (audioElement) {
            if (playing) {
                audioElement.pause();
            } else {
                void audioElement.play();
            }
            setPlaying(!playing);
        } else {
            window.location.href = "demo";
        }
    }

    return (
        <div>
            <Header isTransparent/>
            <main className="relative min-h-screen w-full bg-black text-white">
                <div className="fixed inset-0 z-0">
                    <Image
                        src="/img/homepage.jpg"
                        alt="Musician Background"
                        fill
                        priority
                        sizes="100vw"
                        style={{objectFit: 'cover'}}
                        className="opacity-60 brightness-[0.5] md:brightness-[0.7]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>
                </div>

                <div className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col items-center justify-center pt-32 pb-12 px-4">
                </div>

                <div
                    className="relative md:absolute md:bottom-10 left-0 w-full px-6 md:px-12 z-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 md:gap-0 pb-10 md:pb-0">
                    <div className="flex items-center gap-4 md:gap-6">

                        {
                            loading ?
                                <>
                                    <div
                                        className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-neutral-quaternary rounded-base animate-pulse">
                                        <MdPhoto size={64} className="text-neutral-600"/>
                                    </div>
                                    <div>
                                        <div
                                            className="h-2.5 bg-neutral-600 rounded-full w-48 mb-4 animate-pulse"></div>
                                        <div className="h-2 bg-neutral-600 rounded-full w-40 animate-pulse"></div>
                                    </div>
                                </>
                                :
                                <>
                                    <button
                                        onClick={onPlay}
                                        className="cursor-pointer relative w-16 h-16 md:w-24 md:h-24 overflow-hidden border-2 border-white/20 group/demo">
                                        <Image
                                            src={demo.img_url}
                                            alt="Dernière démo"
                                            fill
                                            sizes="(max-width: 768px) 64px, 96px"
                                            style={{objectFit: 'cover'}}
                                            className="grayscale group-hover/demo:grayscale-0 transition duration-500"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {
                                                playing ?
                                                    <MdPause className="group-hover/demo:size-10 transition-all size-8 duration-500" /> :
                                                    <MdPlayArrow className="group-hover/demo:size-10 transition-all size-8 duration-500" />
                                            }
                                        </div>
                                        <audio className="hidden" src={demo.audio_url}></audio>
                                    </button>
                                    <div>
                                        <p className="text-[var(--accent)] text-[10px] uppercase tracking-[0.2em] font-bold">Dernière Démo</p>
                                        <h3 className="text-xl md:text-3xl font-bold tracking-wide truncate">{demo.name}</h3>
                                        <p className="text-gray-400 text-xs md:text-sm mt-1 uppercase tracking-widest">{demo.created_at}</p>
                                    </div>
                                </>
                        }
                    </div>

                    <div className="w-auto">
                        <Link href="/demo"
                              className="cursor-pointer w-full md:w-auto px-8 md:px-10 py-3 md:py-4 border border-[var(--accent)] text-[var(--accent)] uppercase font-bold text-xs md:text-sm tracking-[0.2em] hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
                            Démos
                        </Link>
                    </div>
                </div>
            </main>
            <AboutUs/>
            <Footer/>
        </div>
    );
}
