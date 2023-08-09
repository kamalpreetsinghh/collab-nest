import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { UserProfile } from "@/common.types";
import { createUser, fetchToken, getUser, updateProfileImage } from "./actions";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const data: any = await getUser(email);

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
          iss: "grafbase",
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
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUser(email)) as { user?: UserProfile };

        if (data && data.user) {
          const user = data.user;
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
    async signIn({ account, profile, user, credentials }) {
      try {
        const data = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        if (data.user && !data.user.image && user?.image) {
          const token = await fetchToken();
          await updateProfileImage(data.user.id, user.image, token);
        }

        if (!data.user) {
          await createUser(user.name!, user.email!, user?.image || null);
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
