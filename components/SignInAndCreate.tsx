"use client";

import React from "react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

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
          <Link className="flex items-center" href="/create-project">
            <span className="rounded-navbar-button">Share Work</span>
          </Link>
        </div>
      ) : (
        <SignInButton />
      )}
    </>
  );
};

export default SignInAndCreate;
