import {NextRequest, NextResponse} from "next/server";
import {createServerClient} from "@supabase/ssr";

export async function proxy(request: NextRequest) {
    console.log("Supabase proxy called");
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({name, value, options}) => supabaseResponse.cookies.set(name, value, options))
                },
            },
        }
    )

    // Do not run code between createServerClient and
    // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: If you remove getClaims() and you use server-side rendering
    // with the Supabase client, your users may be randomly logged out.
    const {data: {user}, error} = await supabase.auth.getUser()

    if (error) {
        console.error(error);
    }

    console.log("user: " + user);

    const pathname = request.nextUrl.pathname

    console.log("pathname: " + pathname);

    const isAllowedWhenNotConnected =
        pathname == '/' ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/reset-password') ||
        pathname.startsWith('/auth') ||
        pathname.startsWith('/demo') ||
        pathname.startsWith('/contact')

    console.log("isAllowedWhenNotConnected: " + isAllowedWhenNotConnected);

    if (!user && !isAllowedWhenNotConnected) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.search = 'next=' + request.nextUrl.pathname
        return NextResponse.redirect(url)
    }

    const isAllowedWhenConnected =
        !pathname.startsWith('/login') &&
        !pathname.startsWith('/register') &&
        !pathname.startsWith('/reset-password')

    console.log("isAllowedWhenConnected: " + isAllowedWhenConnected);

    if (user && !isAllowedWhenConnected) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        url.search = ''
        return NextResponse.redirect(url)
    }

    const needsPasswordUpdate = request.cookies.get("needs_password_update")?.value === "1";
    const isAllowedDuringPasswordUpdate =
        pathname.startsWith('/account/update-password') ||
        pathname.startsWith('/auth')

    if (needsPasswordUpdate && !isAllowedDuringPasswordUpdate) {
        const url = request.nextUrl.clone()
        url.pathname = '/account/update-password'
        url.search = ''
        return NextResponse.redirect(url)
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}