import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
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

        const data: any = await getUserByEmail(email);

        if (!data.user) {
          throw new Error("Email does not exist.");
        }

        const user = data.user;

        const validPassword = await bcryptjs.compare(password, user.password);

        // check if password is correct
        if (!validPassword) {
          throw new Error("Incorrect Username or Password.");
        }

        const loggedInUser = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        return loggedInUser;
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "collab-nest",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const userExists = await getUserByEmail(email);
        if (userExists) {
          const user = userExists;
          const newSession = {
            ...session,
            user: {
              ...session.user,
              id: user.id,
              name: user.name,
              image: user.image ? user.image : session.user.image,
            },
          };

          return newSession;
        }

        return session;
      } catch (error) {
        console.log("Error retrieving user details", error);
        return session;
      }
    },
    async signIn({ profile, user }) {
      try {
        const userExists = await getUserByEmail(profile?.email as string);

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
