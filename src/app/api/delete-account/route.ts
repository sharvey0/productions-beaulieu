import {NextResponse} from "next/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";

export async function POST() {
    const cookieStore = await cookies();

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createServerClient(url, anonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            }
        },
    });

    const {data: {user}, error: userError} = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({error: "Not authenticated"}, {status: 401});
    }

    const admin = createAdminClient();
    const {error: deleteError} = await admin.auth.admin.deleteUser(user.id);

    if (deleteError) {
        return NextResponse.json({error: deleteError.message}, {status: 400});
    }

    return NextResponse.json({ok: true});
}