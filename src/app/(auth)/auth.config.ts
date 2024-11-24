import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnDashboard = nextUrl.pathname.startsWith("/");
      let isOnRegister = nextUrl.pathname.startsWith("/register");
      let isOnLogin = nextUrl.pathname.startsWith("/login");

       const isOnDashboardMain = nextUrl.pathname.startsWith('/dashboard');
    if (isOnDashboardMain)
         return true;
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isOnRegister || isOnLogin) {
        return true;
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
