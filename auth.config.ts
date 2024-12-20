import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    }, callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
              // Here, we are storing custom user properties into the JWT token
              token.id = user.id;
              token.email = user.email;
              token.role = user.role; // Store role in token
              token.name = user.name;
            }
            return token;
        },
        async session({ session, token }: any) {
            // Here, we extend the session object with properties from the token
            if (token) {
              session.user.id = token.id;
              session.user.email = token.email;
              session.user.name = token.name;
              session.user.role = token.role; // Add role to the session
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }: any) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // List of restricted routes with role-based access control
            const restrictedRoutes = ['/dashboard/invoices'];

            // Check for protected routes and validate role
            if (restrictedRoutes.includes(nextUrl.pathname)) {
                if (isLoggedIn && auth.user.role === 'admin') {
                    return true; // Allow access only for admins
                }
                return false; // Deny access for non-admin users
            }
            
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;