"use client";

import React from "react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";
import Button from "./Button";
import { SessionInterface } from "@/common.types";

type SignInAndCreateProps = {
  session: SessionInterface;
};

const SignInAndCreate = ({ session }: SignInAndCreateProps) => {
  const clientSession = useSession();

  return (
    <>
      {(session && session?.user) ||
      clientSession.status === "authenticated" ? (
        <div className="flex gap-3 md:gap-6">
          <ProfileMenu session={session} />
          <Link href="/create-project">
            <Button title="Share work" />
          </Link>
        </div>
      ) : (
        <SignInButton />
      )}
    </>
  );
};

export default SignInAndCreate;
