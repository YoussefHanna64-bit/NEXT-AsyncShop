import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { clientPromise } from "./mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authConfig = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };


