import {
  footerLeftLinks,
  footerLinks,
  footerRightLinks,
  socialMedia,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";

type FooterColumnType = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: FooterColumnType) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

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

        <div className="flex flex-wrap gap-x-4 md:gap-x-12">
          {footerLinks.map((link) => (
            <Link href="/" className="font-bold">
              {link}
            </Link>
          ))}
        </div>

        <div className="flex">
          {socialMedia.map(({ id, img, link }) => (
            <a href={link} target="_blank" rel="noopener noreferrer" key={id}>
              <div className="w-10 h-10">
                <img src={img} alt="icons" width={20} height={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="flex-between footer_copyright font-light mb-16 gap-y-4">
        <div className="flex gap-4">
          <p>© 2024 Collab Nest</p>
          {footerLeftLinks.map((link) => (
            <p className="cursor-pointer">{link}</p>
          ))}
        </div>

        <div className="flex gap-4">
          {footerRightLinks.map((link) => (
            <p className="cursor-pointer">{link}</p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
