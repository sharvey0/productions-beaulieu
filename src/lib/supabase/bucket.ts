import {createClient} from "@/lib/supabase/client";
import { FileObject } from "@/types/FileObject";

export async function loadAllAudioFiles() {
    const supabase = createClient();
    const { data: folders, error: folderError } = await supabase
        .storage
        .from('demo-bucket')
        .list(''); 

    if (folderError) {
        console.error('Folder error:', folderError);
        return;
    }

    const allFiles = await Promise.all(folders.map(async (folder) => {
        const { data, error } = await supabase
            .storage
            .from('demo-bucket')
            .list(folder.name + '/audio'); 

        if (error) {
            console.error(`Error fetching files from ${folder.name}:`, error);
            return [];
        }
        return data.map(file => ({
            ...file,
            url: supabase.storage.from('demo-bucket').getPublicUrl(folder.name + '/audio/' + file.name).data.publicUrl
        }));
    }));

    return allFiles.flat() as FileObject[];
}