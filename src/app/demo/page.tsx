'use client';

import {useEffect, useState} from "react";
import { Header } from "@/components/Header";
import { FileObject } from "@/types/FileObject";
import {loadAllDemoAudioFiles} from "@/lib/supabase/bucket";
import {getDemoAudioFileName} from "@/lib/supabase/utils";

export default function Demo() {
    const [files, setFiles] = useState<FileObject[] | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setFiles(await loadAllDemoAudioFiles());
            if (!cancelled) setLoading(false);
        })();

        return () => {
            cancelled = true;
        };

    }, []);

    return (
        <main className="relative min-h-screen w-full pt-24 md:pt-28 bg-black text-white selection:bg-red-600/30">
            <Header />
            <div>
                <h1>Démos</h1>
                {loading && <div>Loading...</div>}
                {!loading && files && files.length > 0 && (
                    <ul>
                        {files.map((f: FileObject) => (
                            <li key={f.name}>{getDemoAudioFileName(f.name)} <audio controls src={f.url} /></li>
                        ))}
                    </ul>
                )}
                {!loading && files && files.length === 0 && <div>No files found</div>}
            </div>
        </main>
    )
}