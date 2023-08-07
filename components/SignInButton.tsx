"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

const SignInButton = () => {
  const router = useRouter();

  const handleClick = () => {
    const callbackUrl = window.location.pathname;
    if (callbackUrl !== "/signin") {
      localStorage.setItem("callbackUrl", window.location.pathname);
    }
    router.push("/signin");
  };

  return <Button title="Sign In" handleClick={handleClick} />;
};

export default SignInButton;
