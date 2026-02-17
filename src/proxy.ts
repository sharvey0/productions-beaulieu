import {NextRequest, NextResponse} from "next/server";
import {createServerClient} from "@supabase/ssr";

export async function proxy(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
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
                    cookiesToSet.forEach(({name, value}) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({name, value, options}) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Do not run code between createServerClient and
    // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: If you remove getClaims() and you use server-side rendering
    // with the Supabase client, your users may be randomly logged out.
    const {data, error} = await supabase.auth.getClaims()

    if (error) {
        console.error(error);
    }

    const user = data?.claims
    const pathname = request.nextUrl.pathname

    const isAllowedWhenNotConnected =
        pathname == '/' ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/reset-password') ||
        pathname.startsWith('/auth') ||
        pathname.startsWith('/demo') ||
        pathname.startsWith('/contact') ||
        pathname.startsWith('/book') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/politique-de-confidentialite') ||
        pathname.startsWith('/conditions-dutilisation');

    if (!user && !isAllowedWhenNotConnected) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.search = 'next=' + request.nextUrl.pathname
        return NextResponse.redirect(url)
    }

    const isNotAllowedWhenConnected =
        pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/reset-password')

    if (user && isNotAllowedWhenConnected) {
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

    if (pathname.startsWith('/dashboard')) {
        const { data } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user?.sub)
            .single();

        if (!data?.is_admin) {
            const url = request.nextUrl.clone()
            url.pathname = '/'
            url.search = ''
            return NextResponse.redirect(url)
        }
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