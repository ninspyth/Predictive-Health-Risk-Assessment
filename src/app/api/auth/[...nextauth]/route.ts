import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../../models/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
  interface JWT {
    id: string;
    email: string;
  }
  interface User {
    id: string;
    email: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email) {
          throw new Error("Email is required.");
        }

        await connectMongoDB();

        try {
          let user = await User.findOne({ email: credentials.email });

          if (!user) {
            user = await User.create({
              email: credentials.email,
            });
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.log("Authorization error:", error);
          throw new Error("Authentication failed.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id ? String(token.id) : "",
        email: token.email || "",
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
