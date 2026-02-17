import * as React from "react";
import Image from "next/image";
import {HeroProps} from "@/types/components/HeroProps";

export function Hero({title, subtitle}: HeroProps) {
    return (
        <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/img/homepage.jpg"
                    alt="Contact Hero"
                    fill
                    priority
                    style={{objectFit: "cover"}}
                    className="opacity-40 brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
            </div>

            <div className="relative z-10 text-center px-4 lg:pt-20">
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.2em] mb-4">{title}</h1>
                <div className="w-24 h-1 bg-[var(--accent)] mx-auto"></div>
                <p className="mt-6 text-zinc-400 max-w-2xl mx-auto uppercase tracking-widest text-sm">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}