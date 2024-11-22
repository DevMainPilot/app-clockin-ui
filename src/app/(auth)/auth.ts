import { compare } from "bcrypt-ts";
import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUser } from "@/db/queries";

import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  user: User;
}

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

        console.log("----authorize" );

        let users = await getUser(email,password );

        if (users === null ) return null;


        console.log("----authorize NO TIENE QUE LLEGAR SI HAY ERROR: " + users);

        //let passwordsMatch = await compare(password, users[0].password!);
        //if (passwordsMatch)
        //return users[0] as any;

        const users_example = [{ id: 1, username: email, password: password, role: "test_role" }];

        //return null;
        return users_example[0] as any;
      },
    }),
  ],
  callbacks: {
    //
    //async jwt({ token, user }) {
    //  if (user) {
    //    token.id = user.id;
    //  }
    //
    //  return token;
    //},
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
