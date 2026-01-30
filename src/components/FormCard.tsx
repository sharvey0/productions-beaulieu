import {FormProps} from "@/types/FormProps";
import {getSupabaseErrorMessage} from "@/lib/supabase/utils";

export function FormCard({children, isLoading,　isSuccess, successMessage, errors, title, subtitle} : FormProps) {
    return (
        <div style={ isLoading ? {filter: "opacity(50%)"} : undefined }>

            {
                isLoading ?
                    <div className="absolute flex items-center justify-center w-full h-full">
                        <div className="loader"></div>
                    </div> : null
            }

            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {title}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    {subtitle}
                </p>
            </div>

            {isSuccess ? (
                <div className="bg-green-100 border-1 rounded-lg border-green-500 text-green-700 p-4 mb-4" role="alert">
                    <p>{successMessage}</p>
                </div>
            ): null}

            {errors?.api ? (
                <div className="bg-red-100 border-1 rounded-lg border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p>{ getSupabaseErrorMessage(errors.api) }</p>
                </div>
            ) : null}

            {children}
        </div>
    );
}