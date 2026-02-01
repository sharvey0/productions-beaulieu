import {NextResponse} from "next/server";

export async function POST() {
    const res = new NextResponse(null, { status: 204 });

    res.cookies.set("needs_password_update", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
    });

    return res;
}