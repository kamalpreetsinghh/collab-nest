"use client";

import Link from "next/link";
import ProfileMenu from "./profile/ProfileMenu";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

type SignInAndCreateProps = {
  session: Session | null;
};

const SignInAndCreate = ({ session }: SignInAndCreateProps) => {
  const { data: clientSession } = useSession();
  const user = session?.user || clientSession?.user;

  const router = useRouter();

  const handleClick = () => {
    const callbackUrl = window.location.pathname;
    if (callbackUrl !== "/signin") {
      localStorage.setItem("callbackUrl", window.location.pathname);
    }
    router.push("/signin");
  };

  return (
    <>
      {user ? (
        <div className="flex gap-3 md:gap-6">
          <ProfileMenu user={user} />
          <Link href="/create-project">
            <span className="rounded-navbar-button hidden sm:flex">
              Share Work
            </span>
            <span className="rounded-icon px-3 py-1 sm:hidden">+</span>
          </Link>
        </div>
      ) : (
        <Button
          className="primary-button"
          title="Sign In"
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default SignInAndCreate;
