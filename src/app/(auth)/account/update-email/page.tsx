"use client";

import {createClient} from "@/lib/supabase/client";
import * as React from "react";
import {FormCard} from "@/components/form/FormCard";
import {FormInput} from "@/components/form/FormInput";
import Link from "next/link";

const supabase = createClient();

export default function UpdateEmail() {
    const [form, setForm] = React.useState({
        email: "",
        confirmEmail: ""
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    async function updateEmail() {
        const {error} = await supabase.auth.updateUser({email: form.email});

        if (error) {
            setErrors(prevState => ({...prevState, "api": error.code!}));
        } else {
            setIsSuccess(true);

            setTimeout(() => {
                window.location.href = "/account";
            }, 2400);
        }
    }

    function validate() {
        const next: Record<string, string> = {};

        if (!form.email.trim()) next.email = "Une adresse courriel est requise.";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
            next.email = "Une adresse courriel valide est requise.";
        if (!form.confirmEmail.trim()) next.confirmEmail = "La confirmation est requise."
        if (form.email && form.confirmEmail && form.confirmEmail != form.email)
            next.confirmEmail = "Les adresses courriel ne correspondent pas.";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSuccess(false);

        if (!validate()) return;

        setIsLoading(true);

        await updateEmail();

        setIsLoading(false);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: ""}));
    }

    return (
        <div>
            <FormCard
                isLoading={isLoading}
                isSuccess={isSuccess}
                successMessage="Un courriel de validation vous a bien été envoyé."
                errors={errors}
                title="Changer votre adresse courriel"
                subtitle="Entrez votre nouvelle adresse courriel"
            >
                <form onSubmit={onSubmit} className="space-y-4">
                    <FormInput
                        title="Nouvelle adresse courriel"
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        placeholder="john@gmail.com"
                        onChange={onChange}
                        error={errors.email}
                    />

                    <FormInput
                        title="Confirmez l'adresse courriel"
                        id="confirmEmail"
                        type="email"
                        autoComplete="email"
                        value={form.confirmEmail}
                        placeholder="john@gmail.com"
                        onChange={onChange}
                        error={errors.confirmEmail}
                    />

                    <div>
                        <button
                            type="submit"
                            className="mt-2 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer disabled:bg-zinc-700 uppercase tracking-widest"
                            disabled={isLoading}
                        >
                            Changer l&#39;adresse courriel
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
        </div>
    );
}