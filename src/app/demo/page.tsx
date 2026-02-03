'use client';

import {useEffect, useState} from "react";
import { Header } from "@/components/Header";
import { FileObject } from "@/types/FileObject";
import {loadAllDemoAudioFiles} from "@/lib/supabase/bucket";
import {getDemoAudioFileName, getDemoImgFileName} from "@/lib/supabase/utils";

export default function Demo() {
    const [files, setFiles] = useState<FileObject[] | undefined>();
    const [img, setImg] = useState<String[] | undefined>();
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
        <main className="grid justify-items-center min-h-screen w-full pt-24 md:pt-28 bg-black text-white selection:bg-red-600/30">
            <Header />
                <div className="w-full max-w-4xl px-4">
                    {loading && <div>Loading...</div>}
                    {!loading && files && files.length > 0 && (
                        <ul className="flex flex-col gap-6">
                            {files.map((f: FileObject) => (
                                <li key={f.name}>
                                    <div className="flex items-center bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="w-1/2 h-128 bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            <img src={getDemoImgFileName(getDemoAudioFileName(f.name))} alt={getDemoAudioFileName(f.name)} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="w-1/2 p-6 flex flex-col justify-center gap-4">
                                            <h3 className="text-xl font-semibold">{getDemoAudioFileName(f.name)}</h3>
                                            <audio controls className="w-full" src={f.url} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!loading && files && files.length === 0 && <div>No files found</div>}
                </div>
        </main>
    )
} 