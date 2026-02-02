import Image from "next/image";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white selection:bg-red-600/30">
      <div className="fixed inset-0 z-0">
        <Image
          src="/img/homepage.jpg"
          alt="Musician Background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          className="opacity-60 brightness-[0.5] md:brightness-[0.7]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>
      </div>

      <Header />

      <div className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col items-center justify-center pt-32 pb-12 px-4">
        <div className="relative group cursor-default text-center">
           <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-bold tracking-widest text-white uppercase opacity-90 select-none transition-all duration-700 md:group-hover:tracking-[0.15em]">
             Musique
           </h1>
        </div>
      </div>

      <div className="relative md:absolute md:bottom-10 left-0 w-full px-6 md:px-12 z-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0 pb-10 md:pb-0">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative w-16 h-16 md:w-24 md:h-24 overflow-hidden border-2 border-white/20">
            <Image 
              src="/img/homepage.jpg"
              alt="Frando Kally" 
              fill 
              sizes="(max-width: 768px) 64px, 96px"
              style={{ objectFit: 'cover' }} 
              className="grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
          <div>
            <h3 className="text-xl md:text-3xl font-bold tracking-wide">Dernière démo</h3>
            <p className="text-gray-400 text-xs md:text-sm mt-1 uppercase tracking-widest">2 février 2026</p>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button className="cursor-pointer w-full md:w-auto px-8 md:px-10 py-3 md:py-4 border border-red-600 text-red-600 uppercase font-bold text-xs md:text-sm tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-300">
            Démos
          </button>
        </div>
      </div>
    </main>
  );
}
