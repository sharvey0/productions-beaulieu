'use client'

import {useSearchParams} from "next/navigation";
import {getSupabaseErrorMessage} from "@/lib/supabase/utils";
import Link from "next/link";

export default function AuthErrorCode() {

    const searchParams = useSearchParams()

    return (
        <div>
            <div>
                <h1 className="font-semibold text-2xl">Une erreur est survenue.</h1>
                <p className="mt-3">
                    { getSupabaseErrorMessage(searchParams.get('error')!) }
                    {" "}
                    ({searchParams.get('error')})
                </p>
            </div>

            <div className="mt-5">
                <Link href="/" className='text-sm underline underline-offset-4'>Retourner à l&#39;accueil</Link>
            </div>

            <div>
                <p className='text-xs text-gray-400 mt-3'>{ searchParams.get('token_hash') }</p>
                <p className='text-xs text-gray-400'>
                    { searchParams.get('type') }
                    {" | "}
                    { searchParams.get('next') }
                </p>
            </div>
        </div>
    );
}