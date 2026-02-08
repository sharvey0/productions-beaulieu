import {NextRequest, NextResponse} from "next/server";
import {EmailOtpType} from "@supabase/auth-js";

import {createClient} from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = searchParams.get('next') ?? '/login';
    const redirectTo = req.nextUrl.clone();

    redirectTo.pathname = next;

    if (token_hash && type) {
        const supabase = await createClient();

        const {error} = await supabase.auth.verifyOtp({
            type,
            token_hash
        });

        if (!error) {
            const res = NextResponse.redirect(redirectTo);

            if (type === "recovery") {
                res.cookies.set("needs_password_update", "1", {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: true,
                    path: "/",
                    maxAge: 60 * 15,
                });
            }

            return res;
        }

        redirectTo.pathname = '/auth/auth-code-error';
        redirectTo.searchParams.set('error', error.code!);
    }

    return NextResponse.redirect(redirectTo);
}