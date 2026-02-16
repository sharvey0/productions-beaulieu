import {createClient} from "@/lib/supabase/client";

const supabase = createClient();

export async function uploadFile(file: File, bucket: string, folder: string): Promise<{ url: string | null, error: Error | null }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) {
        return { url: null, error: uploadError as unknown as Error };
    }

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
}
