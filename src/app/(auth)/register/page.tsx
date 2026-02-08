'use client';

import React from "react";
import {createClient} from "@/lib/supabase/client";
import {FormCard} from "@/components/FormCard";
import {FormInput} from "@/components/FormInput";

export default function RegisterPage() {
    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    function validate() {
        const next: Record<string, string> = {};
        setErrors({});

        if (!form.firstName.trim()) next.firstName = "Un prénom est requis.";
        if (!form.lastName.trim()) next.lastName = "Un nom complet est requis.";
        if (form.firstName.trim().length < 3) next.firstName = "Le prénom doit faire au moins 3 caractères.";
        if (form.lastName.trim().length < 3) next.lastName = "Le nom doit faire au moins 3 caractères.";
        if (!form.email.trim()) next.email = "Une adresse courriel est requise.";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
            next.email = "Une adresse courriel valide est requise.";
        if (!form.password) next.password = "Un mot de passe est requis.";
        if (form.password && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(form.password.trim()))
            next.password = "Le mot de passe doit contenir : 8 caractères, 1 majuscule, 1 miniscule, 1 caractère spécial et 1 chiffre";
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

        const supabase = createClient();

        const {data, error} = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
                data: {
                    first_name: form.firstName,
                    last_name: form.lastName
                }
            }
        });

        if (data.user && data.user.identities && data.user.identities.length === 0) {
            setErrors(prevState => ({...prevState, "api": "user_already_exists"}));
        } else if (error) {
            setErrors(prevState => ({...prevState, "api": error.code!}));
        } else {
            setIsSuccess(true);
        }

        setIsLoading(false);
    }

    return (
        <FormCard
            isLoading={isLoading}
            isSuccess={isSuccess}
            successMessage="Votre compte a bien été créé! Un courriel de validation vous a été envoyé."
            errors={errors}
            title="Créez votre compte"
            subtitle="Inscrivez-vous pour commencer."
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <FormInput
                    title="Prénom"
                    id="firstName"
                    type="text"
                    autoComplete="first-name"
                    value={form.firstName}
                    placeholder="Votre prénom"
                    onChange={onChange}
                    error={errors.firstName}
                />

                <FormInput
                    title="Nom"
                    id="lastName"
                    type="text"
                    autoComplete="last-name"
                    value={form.lastName}
                    placeholder="Votre nom"
                    onChange={onChange}
                    error={errors.lastName}
                />

                <FormInput
                    title="Courriel"
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    placeholder="joe@entreprise.com"
                    onChange={onChange}
                    error={errors.email}
                />

                <FormInput
                    title="Mot de passe"
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
                    type="confirmPassword"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    placeholder="Confirmation du mot de passe"
                    onChange={onChange}
                    error={errors.confirmPassword}
                    isPassword={true}
                />

                <button
                    type="submit"
                    className="mt-2 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer disabled:bg-zinc-700 uppercase tracking-widest"
                    disabled={isLoading}
                >
                    Créer un compte
                </button>

                <p className="text-center text-sm text-zinc-400">
                    Vous avez déjà un compte ?{" "}
                    <a href="/login"
                       className="font-medium text-white hover:text-[var(--accent)] underline underline-offset-4 transition-colors">
                        Se connecter
                    </a>
                </p>
            </form>
        </FormCard>
    );
}