"use client";

import { useEffect, useState } from "react";
import {createClient} from "@/lib/supabase/client";
import { Header } from "@/components/Header";

export default function Demo() {
    const [files, setFiles] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        
        async function loadFiles() {
            const supabase = createClient();
            const { data, error } = await supabase
                .storage
                .from('demo-bucket')
                .list('');

            if (!mounted) return;

            if (error) {
                console.error('Error listing files:', error.message);
                setFiles([]);
                setLoading(false);
                return;
            }

            setFiles(data ?? []);
            setLoading(false);
        }

        loadFiles();

        return () => {
            mounted = false;
        }
    }, [])

    return (
        <main className="relative min-h-screen w-full pt-24 md:pt-28 bg-black text-white selection:bg-red-600/30">
            <Header />
            <div>
                <h1>Démos</h1>
                {loading && <div>Loading...</div>}
                {!loading && files && files.length > 0 && (
                    <ul>
                        {files.map((f: any) => (
                            <li key={f.name}>{f.name}</li>
                        ))}
                    </ul>
                )}
                {!loading && files && files.length === 0 && <div>No files found</div>}
            </div>
        </main>
    )
}