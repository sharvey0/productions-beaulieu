"use client";

import {createClient} from "@/lib/supabase/client";
import * as React from "react";
import {useRouter} from "next/navigation";
import {FormCard} from "@/components/FormCard";

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
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-slate-900">
                        Adresse courriel
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        value={form.email}
                        onChange={onChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        placeholder="Votre adresse courriel"
                    />
                    {errors.email ? (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="password" className="text-sm font-medium text-slate-900">
                        Nouveau mot de passe
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        value={form.password}
                        onChange={onChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        placeholder="••••••••"
                    />
                    {errors.password ? (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    ) : null}
                </div>

                <div className="mb-7">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-slate-900"
                    >
                        Confirmez le mot de passe
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={onChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        placeholder="••••••••"
                    />
                    {errors.confirmPassword ? (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    ) : null}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer disabled:bg-slate-500"
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