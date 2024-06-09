import { footerLeftLinks, footerLinks, footerRightLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import {
  FaTwitter,
  FaSquareFacebook,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex-start footer pt-16">
      <div
        className="flex flex-col md:flex-row w-full justify-center 
      items-center md:justify-between gap-4"
      >
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            width={115}
            height={38}
            alt="Collab Nest"
          />
        </Link>

        <div className="flex flex-wrap gap-y-2 gap-x-4 md:gap-x-12 justify-center">
          {footerLinks.map((link) => (
            <Link href="/" className="font-bold" key={link}>
              {link}
            </Link>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareFacebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.pinterest.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPinterest className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="flex-between footer-copyright font-light mb-16 gap-y-4">
        <div className="flex gap-4">
          <p>© 2024 Collab Nest</p>
          {footerLeftLinks.map((link) => (
            <p className="cursor-pointer" key={link}>
              {link}
            </p>
          ))}
        </div>

        <div className="flex gap-4">
          {footerRightLinks.map((link) => (
            <p className="cursor-pointer" key={link}>
              {link}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
