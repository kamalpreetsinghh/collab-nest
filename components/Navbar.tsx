import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constants";
import { getCurrentUser } from "@/lib/session";
import ToggleSwitch from "./ToggleSwitch";
import SignInAndCreate from "./SignInAndCreate";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            width={115}
            height={43}
            alt="Flexibbble"
          />
        </Link>
        <ul className="xl:flex text-sm text-grey-color hidden gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        <ToggleSwitch />
        <SignInAndCreate session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
