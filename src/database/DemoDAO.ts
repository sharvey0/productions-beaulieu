import {createClient} from "@/lib/supabase/client";
import {Demo} from "@/types/Demo";

const supabase = createClient();

export async function loadAllDemo() {
    const { data, error } = await supabase
        .from("demos")
        .select()

    if (error || !data) {
        console.log("Unable to retrieve demo files: " + error);
    }

    return data as Array<Demo>;
}