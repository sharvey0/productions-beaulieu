'use client';

export default function RegisterPage() {
    return (
        <div>
            <div className='mb-4'>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    Créer un compte
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Se créer un compte pour commencer.
                </p>
            </div>
            <form className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-900">
                        Prénom
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="first-name"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        placeholder="Votre prénom"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer disabled:bg-slate-500"
                >
                    Créer un compte
                </button>

                <p className="text-center text-sm text-slate-600">
                    Vous avez déjà un compte ?{" "}
                    <a href="/login" className="font-medium text-slate-900 underline underline-offset-4">
                        Se connecter
                    </a>
                </p>
            </form>
        </div>
    );
}