"use client";

import {createClient} from "@/lib/supabase/client";
import * as React from "react";
import {useRouter} from "next/navigation";
import {FormCard} from "@/components/FormCard";
import {FormInput} from "@/components/FormInput";

const supabase = createClient();

export default function UpdatePassword() {
    const [form, setForm] = React.useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const router = useRouter();

    async function resetPassword() {
        const { data: { user } } = await supabase.auth.getUser();

        if (user?.email != form.email) {
            return setErrors(prevState => ({ ...prevState, "api": "emails_not_corresponding" }));
        }

        const { error } = await supabase.auth.updateUser({ password: form.password });

        if (error) {
            setErrors(prevState => ({ ...prevState, "api": error.code! }));
        } else {
            setIsSuccess(true);

            setTimeout(() => {
                router.push('/dashboard');
            }, 700);
        }
    }

    function validate() {
        const next: Record<string, string> = {};

        if (!form.email.trim()) next.email = "Une adresse courriel est requise.";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            next.email = "Une adresse courriel valide est requise.";
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

        if(!validate()) return;

        setIsLoading(true);

        await resetPassword();

        setIsLoading(false);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    return (
        <FormCard
            isLoading={isLoading}
            isSuccess={isSuccess}
            successMessage="Votre mot de passe a bien été modifié."
            errors={errors}
            title="Changer le mot de passe"
            subtitle="Entrez votre adresse courriel"
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
                    className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer disabled:bg-slate-500"
                    disabled={ isLoading }
                >
                    Changer le mot de passe
                </button>

                <p className="text-center text-sm text-slate-600">
                    Vous avez déjà un compte ?{" "}
                    <a href="/login" className="font-medium text-slate-900 underline underline-offset-4">
                        Se connecter
                    </a>
                </p>
            </form>
        </FormCard>
    );
}