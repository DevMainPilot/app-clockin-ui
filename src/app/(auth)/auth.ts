import { compare } from "bcrypt-ts";
import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "@/data-auth/actions/auth-actions";
import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  user: User;
}

interface ExtendedUser extends User { access_token: string; }

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        let users = await getUser(email, password);

        if (users === null) {
          return null;
        }
        const users_tmp = [
          {
            id: email,
            username: users.user_id,
            password: password,
            role: "role",
            access_token: users.access_token,
          },
        ];

        return users_tmp[0] as ExtendedUser;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.accessToken = extendedUser.access_token;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.accessToken as string;
      }
      return session;
    },
  },
});
