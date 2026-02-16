import {createClient} from "@/lib/supabase/client";
import {Demo} from "@/types/Demo";

const supabase = createClient();

export async function loadAllDemo() {
    const { data, error } = await supabase
        .from("demos")
        .select();

    if (error || !data) {
        console.log("Unable to retrieve demo files: " + error);
    }

    return data as Array<Demo>;
}

export async function getLastDemo() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('demos')
        .select('*')
        .order('created_at', {  ascending: false })
        .limit(1)
        .single();

    if (error || !data) {
        console.error('Unable to retrieve last demo: ', error);
        return;
    }

    return data;
}

export async function addDemo(demo: Omit<Demo, 'id'>) {
    const { data, error } = await supabase
        .from("demos")
        .insert([demo])
        .select();

    if (error) {
        console.error("Unable to add demo: ", error);
        return { error };
    }

    return { data };
}

export async function updateDemo(id: number, demo: Partial<Demo>) {
    const { data, error } = await supabase
        .from("demos")
        .update(demo)
        .eq('id', id)
        .select();

    if (error) {
        console.error("Unable to update demo: ", error);
        return { error };
    }

    return { data };
}

export async function deleteDemo(id: number) {
    const { error } = await supabase
        .from("demos")
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Unable to delete demo: ", error);
        return { error };
    }

    return { success: true };
}