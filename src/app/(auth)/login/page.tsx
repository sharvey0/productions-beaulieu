"use client";

import { FormCard } from "@/components/FormCard";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {FormInput} from "@/components/FormInput";

const supabase = createClient();

export default function LoginPage() {
    const [form, setForm] = React.useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

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
        if(!validate()) return;

        setIsLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password
        });

        setIsLoading(false);

        if (!error) {
            router.push("/dashboard");
        } else {
            setErrors(prevState => ({ ...prevState, "api": error.code! }));
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
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

                <p className="text-xs text-slate-600 mt-3 cursor-pointer">
                    <Link href='/reset-password' className="font-medium text-slate-900 underline underline-offset-4">
                        Réinitialiser le mot de passe
                    </Link>
                </p>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer disabled:bg-slate-500"
                >
                    Se connecter
                </button>

                <p className="text-center text-sm text-slate-600">
                    Vous n&#39;avez pas de compte ?{" "}
                    <a href="/register" className="font-medium text-slate-900 underline underline-offset-4">
                        S&#39;inscrire
                    </a>
                </p>
            </form>
        </FormCard>
    )
}