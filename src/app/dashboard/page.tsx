"use client";

import {FormCard} from "@/components/FormCard";
import {FormInput} from "@/components/FormInput";
import {loadAllCategories} from "@/database/CategoryDAO";
import {Category} from "@/types/Category";
import * as React from "react";
import { useEffect } from "react";

export default function DashboardPage() {
    const [form, setForm] = React.useState({
        name: "",
        category: "",
        file: null as File | null
    });

    const [categories, setCategories] = React.useState<Array<Category>>([]);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    useEffect(() => {
            let cancelled = false;
    
            (async () => {
                setLoading(true);
                setCategories(await loadAllCategories());
    
                if (!cancelled) setLoading(false);
            })();
    
            return () => {
                cancelled = true;
            };
        }, []);
             

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: ""}));
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        setForm((prev) => ({...prev, file}));
        setErrors((prev) => ({...prev, file: ""}));
    }

    function validate() {
        const errors: Record<string, string> = {};

        if (!form.name.trim()) errors.name = "Le nom est requis.";
        if (!form.category) errors.category = "La catégorie est requise.";
        if (!form.file) errors.file = "Le fichier est requis.";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setSuccess(false);
        if (!validate()) return;

        // TODO - AJOUT DANS LA BD
        console.log(form);

        setSuccess(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <FormCard
                    isLoading={loading}
                    isSuccess={success}
                    successMessage="Formulaire soumis avec succès !"
                    errors={errors}
                    title="Tableau de bord"
                    subtitle="Créer une nouvelle entrée de démo"
                >
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormInput
                            title="Nom de la démo"
                            id="name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            placeholder="Entrez le nom de la démo"
                            onChange={onChange}
                            error={errors.name}
                        />

                        <div>
                            <label htmlFor="category" className="text-sm font-medium text-white">
                                Catégorie
                            </label>
                            <div className="relative mt-1">
                                <select
                                    id="category"
                                    name="category"
                                    value={form.category}
                                    onChange={onChange}
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="bg-zinc-900">
                                        Sélectionnez une catégorie
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.label}
                                            className="bg-zinc-900"
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            {errors.category && (
                                <p className="mt-1 text-sm text-[var(--accent)]">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="file" className="text-sm font-medium text-white">
                                Téléchargement de fichier
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={onFileChange}
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent)] file:text-white hover:file:bg-[var(--accent)]/90 cursor-pointer"
                                />
                            </div>
                            {errors.file && (
                                <p className="mt-1 text-sm text-[var(--accent)]">
                                    {errors.file}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-white transition-all hover:bg-[var(--accent)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Soumettre
                        </button>
                    </form>
                </FormCard>
            </div>
        </div>
    );
}