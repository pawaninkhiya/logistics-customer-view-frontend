import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login'];
const PROTECTED_ROUTES = [
    '/',
    '/profile',
    '/account',
    '/account/edit',
    '/bookings',
    '/create_booking',
    '/create_booking/booking_confirm',
    '/create_booking/vehicale_type',
    '/create_booking/booking_confirm/success'
];


// middleware.ts
export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Handle login redirects
    if (pathname === '/login') {
        if (token) {
            const redirectTo = req.nextUrl.searchParams.get('redirect') || '/';
            return NextResponse.redirect(new URL(redirectTo, req.url));
        }
        return NextResponse.next();
    }

    // Check protected routes
    const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    if (isProtected && !token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const PUBLIC_ROUTES = ['/login'];
// const PROTECTED_ROUTES = [
//     '/',
//     '/profile',
//     '/account',
//     '/account/edit',
//     '/bookings',
//     '/create_booking',
//     '/create_booking/booking_confirm',
//     '/create_booking/vehicale_type',
//     '/create_booking/booking_confirm/success'
// ];


// export async function middleware(req: NextRequest) {
//     const token = req.cookies.get('auth_token')?.value;
//     const { pathname } = req.nextUrl;

//     const isPublicRoute = PUBLIC_ROUTES.some(route =>
//         pathname.startsWith(route)
//     );
//     const isProtectedRoute = PROTECTED_ROUTES.some(route =>
//         pathname.startsWith(route)
//     );

//     if (isPublicRoute && token) {
//         if (pathname !== '/') {
//             return NextResponse.redirect(new URL('/', req.url));
//         }
//         return NextResponse.next();
//     }

//     if (isProtectedRoute && !token) {
//         if (pathname !== '/login') {
//             const redirectUrl = new URL('/login', req.url);
//             redirectUrl.searchParams.set('redirect', pathname);
//             return NextResponse.redirect(redirectUrl);
//         }
//         return NextResponse.next();
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };