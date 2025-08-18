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

// Update your middleware to actually verify the token
export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    const { pathname } = req.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.some(route =>
        pathname.startsWith(route)
    );
    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    // Add token verification
    let isValidToken = false;
    if (token) {
        try {
            // Add your token verification logic here
            // For example, make an API call to verify token
            // or decode JWT if you're using it
            isValidToken = true; // Replace with actual verification
        } catch (error) {
            isValidToken = false;
        }
    }

    if (isPublicRoute && isValidToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (isProtectedRoute && !isValidToken) {
        const redirectUrl = new URL('/login', req.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}
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