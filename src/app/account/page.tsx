"use client";

import * as React from "react";
import {Header} from "@/components/Header";
import {createClient} from "@/lib/supabase/client";
import Link from "next/link";
import {MdArrowForward, MdDelete, MdLock, MdLogout, MdMail} from "react-icons/md";
import {JwtPayload} from "@supabase/auth-js/src";

export default function AccountPage() {
    const [user, setUser] = React.useState<JwtPayload | null>(null);
    const [loading, setLoading] = React.useState(true);
    const supabase = createClient();

    React.useEffect(() => {
        async function getUser() {
            const {data, error} = await supabase.auth.getClaims();

            if (error || !data) {
                console.log("No claims: " + error);
            }

            setUser(data!.claims);
            setLoading(false);
        }

        getUser();
    }, [supabase]);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-32 lg:py-0">
            <Header showOnlyLogo/>
            <main className="mx-auto max-w-lg w-full flex flex-col justify-center items-center">
                <div
                    className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
                    <h1 className="text-3xl font-semibold">Votre compte</h1>
                    <p className="text-neutral-500 mt-2">Gérez les paramètres de votre compte.</p>
                    <hr className="my-6 border-neutral-800"/>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]"></div>
                        </div>
                    ) : user ? (
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Adresse
                                    courriel</label>
                                <p className="text-lg mt-1">{user.email}</p>
                            </div>

                            <div className="flex gap-15 items-end">
                                <div>
                                    <label
                                        className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Prénom</label>
                                    <p className="text-lg mt-1">{user.user_metadata?.first_name}</p>
                                </div>
                                <div>
                                    <label
                                        className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Nom</label>
                                    <p className="text-lg mt-1">{user.user_metadata?.last_name}</p>
                                </div>
                            </div>
                            <p className="text-neutral-600 text-xs">Rejoint
                                le {new Date(user.created_at).toLocaleDateString()}</p>

                            <div className="space-y-3">
                                <Link
                                    href="/account/update-email"
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                >
                                    <MdMail className="text-[var(--accent)] text-xl"/>
                                    <span className="flex-1 font-medium text-left">Changer l&#39;adresse courriel</span>
                                    <MdArrowForward
                                        className="text-neutral-500 group-hover:translate-x-1 transition-transform font-black"/>
                                </Link>

                                <Link
                                    href="/account/update-password"
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                >
                                    <MdLock className="text-[var(--accent)] text-xl"/>
                                    <span className="flex-1 font-medium text-left">Changer le mot de passe</span>
                                    <MdArrowForward
                                        className="text-neutral-500 group-hover:translate-x-1 transition-transform font-black"/>
                                </Link>

                                <Link
                                    href="/logout"
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                >
                                    <MdLogout className="text-[var(--accent)] text-xl"/>
                                    <span className="flex-1 font-medium text-left">Se déconnecter</span>
                                </Link>

                                <Link
                                    href="/account/delete-my-account"
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all group text-red-400"
                                >
                                    <MdDelete className="text-xl"/>
                                    <span className="flex-1 font-medium text-left">Supprimer mon compte</span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-neutral-400 mb-6">Vous n&apos;êtes pas connecté.</p>
                            <Link
                                href="/login"
                                className="inline-block px-8 py-3 bg-[var(--accent)] text-white font-bold rounded-lg uppercase tracking-widest hover:bg-red-700 transition-all"
                            >
                                Se connecter
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}