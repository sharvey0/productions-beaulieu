import {createClient} from "@/lib/supabase/client";
import {Category} from "@/types/Category";

const supabase = createClient();

export async function loadAllCategories() {
    const {data, error} = await supabase
        .from("categories")
        .select();

    if (error || !data) {
        console.error("Unable to fetch categories: " + error);
    }

    return data as Array<Category>;
}