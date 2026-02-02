export default function AuthLayout({ children }:  Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="h-screen flex items-center bg-gradient-to-b from-blue-100 to-white text-black">
            <div className="mx-auto w-full max-w-md">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    { children }
                </div>
            </div>
        </main>
    );
}