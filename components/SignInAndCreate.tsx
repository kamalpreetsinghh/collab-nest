"use client";

import React from "react";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import ProfileMenu from "./profile/ProfileMenu";

type SignInAndCreateProps = {
  session: Session | null;
};

const SignInAndCreate = ({ session }: SignInAndCreateProps) => {
  const clientSession = useSession();

  return (
    <>
      {(session && session?.user) ||
      clientSession.status === "authenticated" ? (
        <div className="flex gap-3 md:gap-6">
          <ProfileMenu
            user={
              session && session?.user ? session.user : clientSession.data?.user
            }
          />
          <Link href="/create-project">
            <span className="rounded-navbar-button hidden sm:flex">
              Share Work
            </span>
            <span className="rounded-icon px-3 py-1 sm:hidden">+</span>
          </Link>
        </div>
      ) : (
        <SignInButton />
      )}
    </>
  );
};

export default SignInAndCreate;
