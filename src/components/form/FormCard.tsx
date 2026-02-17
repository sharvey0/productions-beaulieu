import {FormCardProps} from "@/types/form/FormCardProps";
import {getSupabaseErrorMessage} from "@/lib/supabase/utils";
import * as React from "react";

export function FormCard(
    {
        children,
        isLoading,
        isSuccess,
        successMessage,
        errors,
        title,
        subtitle
    }: FormCardProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {
                isLoading ?
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]"></div>
                    </div> : null
            }

            <div className={isLoading ? "opacity-50" : ""}>
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                        {title}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        {subtitle}
                    </p>
                </div>

                <hr className="text-neutral-800 mb-5"/>

                {isSuccess ? (
                    <div className="bg-green-800 rounded-lg  text-white p-4 mb-4" role="alert">
                        <p>{successMessage}</p>
                    </div>
                ) : null}

                {errors?.api ? (
                    <div className="bg-[var(--accent)] rounded-lg text-white p-4 mb-4" role="alert">
                        <p>{getSupabaseErrorMessage(errors.api)}</p>
                    </div>
                ) : null}

                {children}
            </div>
        </div>
    );
}