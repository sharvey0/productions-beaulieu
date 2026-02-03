import {createClient} from "@/lib/supabase/client";
import {FileObject} from "@/types/FileObject";

export async function loadAllDemoAudioFiles() {
    const supabase = createClient();
    const bucketPublicURL = "https://odsdfqrwfaioqstxalpg.supabase.co/storage/v1/object/public/demo-bucket/";

    const { data: files, error: fileError } = await supabase
        .storage
        .from('demo-bucket')
        .list('');

    if (fileError) {
        console.error('File error: ', fileError);
        return;
    }

    const result: FileObject[] = (files ?? []).map((file) => ({
        name: file.name,
        url: bucketPublicURL + file.name
    }));
    return result
}