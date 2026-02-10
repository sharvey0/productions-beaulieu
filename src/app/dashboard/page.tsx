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
        category: ""
    });

    const [categories, setCategories] = React.useState<Array<Category>>([]);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [Loading, setLoading] = React.useState(false);
    const [Success, setSuccess] = React.useState(false);

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

    function validate() {
        const next: Record<string, string> = {};

        if (!form.name.trim()) next.name = "Name is required.";
        if (!form.category) next.category = "Category is required.";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        // TODO: ADD TO DATABASE
        console.log("Form data: ", form);

        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
            setSuccess(false);
            setForm({name: "", category: ""});
        }, 2000);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <FormCard
                    isLoading={Loading}
                    isSuccess={Success}
                    successMessage="Form submitted successfully!"
                    errors={errors}
                    title="Dashboard"
                    subtitle="Create a new entry"
                >
                    <form onSubmit={onSubmit} className="space-y-4">
                        <FormInput
                            title="Name"
                            id="name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            placeholder="Enter name"
                            onChange={onChange}
                            error={errors.name}
                        />

                        <div>
                            <label htmlFor="category" className="text-sm font-medium text-white">
                                Category
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
                                        Select a category
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

                        <button
                            type="submit"
                            disabled={Loading}
                            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-white transition-all hover:bg-[var(--accent)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit
                        </button>
                    </form>
                </FormCard>
            </div>
        </div>
    );
}