"use client";

import {createClient} from "@/lib/supabase/client";
import * as React from "react";
import {FormCard} from "@/components/FormCard";
import {FormInput} from "@/components/FormInput";
import Link from "next/link";

const supabase = createClient();

export default function UpdatePassword() {
    const [form, setForm] = React.useState({
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    async function resetPassword() {
        const {error} = await supabase.auth.updateUser({password: form.password});

        if (error) {
            setErrors(prevState => ({...prevState, "api": error.code!}));
        } else {
            try {
                await fetch("/account/update-password/clear-flag", {method: "POST"});
            } catch (e) {
                console.error("Failed to clear password update flag", e);
            }

            setIsSuccess(true);

            setTimeout(() => {
                window.location.href = "/account";
            }, 2400);
        }
    }

    function validate() {
        const next: Record<string, string> = {};

        if (!form.password) next.password = "Un mot de passe est requis.";
        if (form.password && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(form.password.trim()))
            next.password = "Le mot de passe doit contenir : 8 caractères, 1 majuscule, 1 miniscule et 1 caractère spécial";
        if (!form.confirmPassword) next.confirmPassword = "Confirmez votre mot de passe.";
        if (form.password && form.confirmPassword && form.password !== form.confirmPassword)
            next.confirmPassword = "Les mots de passe ne correspondent pas.";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSuccess(false);

        if (!validate()) return;

        setIsLoading(true);

        await resetPassword();

        setIsLoading(false);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: ""}));
    }

    return (
        <FormCard
            isLoading={isLoading}
            isSuccess={isSuccess}
            successMessage="Votre mot de passe a bien été modifié."
            errors={errors}
            title="Changer le mot de passe"
            subtitle="Entrez votre nouveau mot de passe"
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <FormInput
                    title="Nouveau mot de passe"
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    value={form.password}
                    placeholder="Mot de passe"
                    onChange={onChange}
                    error={errors.password}
                    isPassword={true}
                />

                <FormInput
                    title="Confirmez le mot de passe"
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    placeholder="Confirmation du mot de passe"
                    onChange={onChange}
                    error={errors.confirmPassword}
                    isPassword={true}
                />

                <div>
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer disabled:bg-zinc-700 uppercase tracking-widest"
                        disabled={isLoading}
                    >
                        Changer le mot de passe
                    </button>
                    <Link href="/account">
                        <button
                            className="mt-2 w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm font-bold text-white/80 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all cursor-pointer disabled:bg-zinc-700 uppercase tracking-widest">
                            Retour
                        </button>
                    </Link>
                </div>
            </form>
        </FormCard>
    );
}