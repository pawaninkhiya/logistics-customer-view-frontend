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


export async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    const { pathname } = req.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.some(route =>
        pathname.startsWith(route)
    );
    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    if (isPublicRoute && token) {
        if (pathname !== '/') {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    }

    if (isProtectedRoute && !token) {
        if (pathname !== '/login') {
            const redirectUrl = new URL('/login', req.url);
            redirectUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};