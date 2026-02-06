import {Header} from "@/components/Header";
import {ReactNode} from "react";

export default function AuthLayout({ children }:  Readonly<{ children: ReactNode; }>) {
    return (
        <div>
            <Header showOnlyLogo />
            <main className="h-screen min-h-160 flex items-center bg-black bg-gradient-to-br from-black via-zinc-950 to-black text-white">
                <div className="mx-auto w-full max-w-md">
                    { children }
                </div>
            </main>
        </div>
    );
}