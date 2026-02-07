import {createClient} from "@/lib/supabase/client";
import {DemoObject} from "@/types/DemoObject";
import { getDemoAudioFileName } from "./utils";
import { DemoAudioCategoryMap } from "@/enums/supabase/DemoAudioCategory";
import type { DemoAudioCategory } from "@/enums/supabase/DemoAudioCategory";

export async function loadAllDemoAudioFiles() {
    const supabase = createClient();
    const bucketPublicURL = "https://odsdfqrwfaioqstxalpg.supabase.co/storage/v1/object/public/demo-bucket/audio/";

    const { data: files, error: fileError } = await supabase
        .storage
        .from('demo-bucket')
        .list('audio');

    if (fileError) {
        console.error('File error: ', fileError);
        return;
    }

    const result: DemoObject[] = (files ?? []).map((file) => ({
        name: getDemoAudioFileName(file.name),
        url: bucketPublicURL + file.name,
        category: DemoAudioCategoryMap[file.name as DemoAudioCategory]
    }));
    return result
}

export async function getLastDemoUpdate() {
    const supabase = createClient();

    const { data: date, error: bucketError } = await supabase
        .from('demos')
        .select('*')
        .order('created_at', {  ascending: false })
        .limit(1);

    if (bucketError) {
        console.error('File error: ', bucketError);
        return;
    }

    return date;
}