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

export async function addCategory(label: string) {
    const { data, error } = await supabase
        .from("categories")
        .insert([{ label }])
        .select();

    if (error) {
        console.error("Unable to add category: ", error);
        return { error };
    }

    return { data };
}

export async function updateCategory(id: number, label: string) {
    const { data, error } = await supabase
        .from("categories")
        .update({ label })
        .eq('id', id)
        .select();

    if (error) {
        console.error("Unable to update category: ", error);
        return { error };
    }

    return { data };
}

export async function deleteCategory(id: number) {
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Unable to delete category: ", error);
        return { error };
    }

    return { success: true };
}