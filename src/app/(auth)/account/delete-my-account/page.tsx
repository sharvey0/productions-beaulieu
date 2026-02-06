"use client";

import {FormCard} from "@/components/FormCard";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";

export default function DeleteMyAccountPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(5);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const isDeleteEnabled = remainingSeconds <= 0 && !isLoading;

    const supabase = createClient();

    useEffect(() => {
        countdownRef.current = setInterval(() => {
            setRemainingSeconds((prevNum) => {
                const nextNum = prevNum - 1;

                if (nextNum <= 0) {
                    if (countdownRef.current) {
                        clearInterval(countdownRef.current);
                        countdownRef.current = null;
                    }
                    return 0;
                }

                return nextNum;
            });


        }, 1000)

        return () => {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
                countdownRef.current = null;
            }
        }
    }, []);

    async function deleteAccount() {
        setIsLoading(true);

        const { data, error } = await supabase.auth.getUser();

        if (error) {
            return console.error("Une erreur est survenue lors de l'obtention de l'utilisateur");
        }

        // TODO

        setIsLoading(false);
    }

    return (
        <FormCard
            isLoading={isLoading}
            title="Êtes-vous certain de vouloir supprimer votre compte?"
            subtitle="Cette action est irréversible."
        >
            <div className="flex gap-4">
                <Link href="/account" className="cursor-pointer px-5 h-full py-2 rounded-lg hover:bg-[var(--accent)] border border-red-900 bg-red-900 transition-all group">
                    Non
                </Link>
                <button
                    type="button"
                    onClick={deleteAccount}
                    disabled={!isDeleteEnabled}
                    className="cursor-pointer px-5 h-full py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all group disabled:bg-transparent disabled:border-0"
                >
                    {remainingSeconds > 0 ? `${remainingSeconds}s` : "Supprimer mon compte"}
                </button>
            </div>
        </FormCard>
    );
}