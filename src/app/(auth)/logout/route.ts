import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

async function signOut() {
    const supabase = await createClient();
    const {error} = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    }

    redirect("/");
}

export async function GET() {
    await signOut();
}