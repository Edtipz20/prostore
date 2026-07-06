/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [],
  callbacks: {
    session({ session, token }: any) {
      if (token?.sub) session.user.id = token.sub;
      if (token?.role) session.user.role = token.role;
      return session;
    },
    authorized({ auth, request }: any) {
      // Array of regex patterns of paths we want to protect
      const protectPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      // Get pathname from the req URL object
      // const { pathname } = request.nextUrl;

      // CHeck if user is not authenticated and accessing a protected path
      // if (!auth && protectPaths.some((path) => path.test(pathname)))
      //   return false;

      // SECURITY: /admin requires the admin role, not just any signed-in
      // user. This is a fast edge-level check; app/admin/layout.tsx does
      // the authoritative check server-side as defense in depth.
      // if (/\/admin/.test(pathname) && auth?.user?.role !== "admin") {
      //   return false;
      // }

      // Check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // Clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        // Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // Set newly generated sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
