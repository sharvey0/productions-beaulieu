"use client";

import {FormCard} from "@/components/form/FormCard";

import * as React from "react";
import {Suspense} from "react";
import {useSearchParams} from "next/navigation";
import {createClient} from "@/lib/supabase/client";
import Link from "next/link";
import {FormInput} from "@/components/form/FormInput";

const supabase = createClient();

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginPageContent/>
        </Suspense>
    );
}

export function LoginPageContent() {
    const [form, setForm] = React.useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);

    const searchParams = useSearchParams();

    function validate() {
        const next: Record<string, string> = {};

        if (!form.email.trim()) next.email = "Une adresse courriel est requise.";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            next.email = "Une adresse courriel valide est requise.";
        if (!form.password) next.password = "Un mot de passe est requis.";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        const {error} = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password
        });

        const next = searchParams.get("next");

        setIsLoading(false);

        if (!error) {
            window.location.href = next ? next : "/";
        } else {
            setErrors(prevState => ({...prevState, "api": error.code!}));
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: ""}));
    }

    return (
        <FormCard
            isLoading={isLoading}
            errors={errors}
            title="Se connecter"
            subtitle="Connectez-vous pour commencer."
        >

            <form onSubmit={onSubmit} className="space-y-4">
                <FormInput
                    title="Adresse courriel"
                    id="email"
                    type="text"
                    autoComplete="email"
                    value={form.email}
                    placeholder="Votre adresse courriel"
                    onChange={onChange}
                    error={errors.email}
                />

                <FormInput
                    title="Mot de passe"
                    id="password"
                    type="password"
                    autoComplete="password"
                    value={form.password}
                    placeholder="Mot de passe"
                    onChange={onChange}
                    error={errors.password}
                    isPassword={true}
                />

                <p className="text-xs text-zinc-400 mt-3 cursor-pointer">
                    <Link href='/reset-password'
                          className="font-medium text-white hover:text-[var(--accent)] underline underline-offset-4 transition-colors">
                        Réinitialiser le mot de passe
                    </Link>
                </p>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer disabled:bg-zinc-700 uppercase tracking-widest"
                >
                    Se connecter
                </button>
            </form>
        </FormCard>
    )
}