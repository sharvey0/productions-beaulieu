import {Header} from "@/components/Header";
import {ReactNode} from "react";

export default function AuthLayout({ children }:  Readonly<{ children: ReactNode; }>) {
    return (
        <div>
            <Header showOnlyLogo />
            <main className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-32 lg:py-0">
                <div className="mx-auto w-full max-w-md">
                    { children }
                </div>
            </main>
        </div>
    );
}