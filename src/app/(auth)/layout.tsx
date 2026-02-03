import {Header} from "@/components/Header";
import {ReactNode} from "react";

export default function AuthLayout({ children }:  Readonly<{ children: ReactNode; }>) {
    return (
        <div>
            <Header showOnlyLogo={true} />
            <main className="h-screen flex items-center bg-black bg-gradient-to-br from-black via-zinc-950 to-black text-white">
                <div className="mx-auto w-full max-w-md">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
                        { children }
                    </div>
                </div>
            </main>
        </div>
    );
}