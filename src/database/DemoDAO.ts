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