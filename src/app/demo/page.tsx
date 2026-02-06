"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { DemoObject } from "@/types/DemoObject";
import { loadAllDemoAudioFiles } from "@/lib/supabase/bucket";
import { getDemoCategoryName } from "@/lib/supabase/utils";

export default function Demo() {
  const [groupedFiles, setGroupedFiles] = useState<
    Record<string, DemoObject[]>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const files = await loadAllDemoAudioFiles();
      const grouped = (files || []).reduce(
        (acc, file) => {
          acc[file.category] = acc[file.category] || [];
          acc[file.category].push(file);
          return acc;
        },
        {} as Record<string, DemoObject[]>,
      );

      setGroupedFiles(grouped);
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories: string[] = ["jeux_video", "noel", "jazz", "pop"];

  return (
    <main className="grid justify-items-center min-h-screen w-full pt-24 md:pt-28 bg-black text-white selection:bg-red-600/30">
      <Header />
      <div className="w-full max-w-4xl px-4 mt-30">
        {loading && (
          <div className="absolute flex items-center justify-center inset-0 z-50">
            <div className="loader"></div>
          </div>
        )}

        {!loading && groupedFiles && Object.keys(groupedFiles).length > 0 && (
          <div>
            {categories.map((category: string) => (
              <div key={category}>
                <h2 className="text-6xl font-bold mt-10 mb-4">{getDemoCategoryName(category)}</h2>
                <ul className="flex flex-col gap-6">
                  {(groupedFiles[category] || []).map((file: DemoObject) => (
                    <li key={file.name}>
                      <div className="flex items-center bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <div className="relative w-1/2 h-128 bg-gray-800 flex-shrink-0">
                          <Image
                            src={"/img/" + file.category + ".jpg"}
                            alt={file.name}
                            fill
                            priority
                            sizes="50vw"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="w-1/2 p-6 flex flex-col justify-center gap-4">
                          <h3 className="text-xl font-semibold">{file.name}</h3>
                          <audio controls className="w-full" src={file.url} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!loading && groupedFiles && Object.keys(groupedFiles).length === 0 && (
          <div className="absolute flex items-center justify-center inset-0 z-50">
            <div>Aucun fichier trouvé</div>
          </div>
        )}
      </div>
    </main>
  );
}
