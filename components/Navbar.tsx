import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constants";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src="/logo-purple.svg"
            width={115}
            height={43}
            alt="Flexibbble"
          />
        </Link>
        <ul className="xl:flex hidden text-sm font-medium gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        <div className="flexCenter mx-4">
          <ToggleSwitch />
          <div>
            <Image src="/theme.svg" width={25} height={25} alt="Theme" />
          </div>
        </div>
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              <Button title="Share work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
