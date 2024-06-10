import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import {
  createUser,
  getUserByEmail,
  updateProfileImage,
} from "./actions/user.action";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getUserByEmail(email);

        if (user && user.password) {
          const validPassword = await bcryptjs.compare(password, user.password);

          if (!validPassword) {
            throw new Error("Incorrect Username or Password.");
          }

          const loggedInUser = {
            id: user.id,
            name: user.name,
            email: user.email,
          };

          return loggedInUser;
        } else {
          throw new Error("Email does not exist.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const email = session?.user?.email;
      try {
        if (email) {
          const userExists = await getUserByEmail(email);
          if (userExists) {
            const user = userExists;
            const newSession = {
              ...session,
              user: {
                ...session.user,
                id: user.id,
                name: user.name,
                image: user.image ? user.image : session?.user?.image,
              },
            };

            return newSession;
          }
        }

        if (session.user) {
          session.user.id = token.userId as string;
        }

        return session;
      } catch (error) {
        console.log("Error retrieving user details", error);
        return session;
      }
    },
    async signIn({ profile, user }) {
      try {
        const userExists = await getUserByEmail(user?.email as string);

        if (userExists && !userExists.image && user?.image) {
          await updateProfileImage(userExists.id, user.image);
        }

        if (!userExists) {
          await createUser(
            profile?.name!,
            profile?.email!,
            user?.image || null
          );
        }

        return true;
      } catch (error: any) {
        console.log(error);

        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session;
}
