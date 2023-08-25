"use client";

import { BiLogoPatreon } from "react-icons/bi";
import { BsDiscord, BsPaypal } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const logoStyling = "text-neutral-300 cursor-pointer";
const Footer = () => (
  <footer className="w-full z-40 bottom-0 mt-auto bg-black">
    <div className="py-6 mx-20 h-[60px] flex">
      <p className="text-neutral-300">
        &copy; {new Date().getFullYear()}. ReadGPT
      </p>
      <div className="ml-auto items-center flex gap-6">
        <BsDiscord className={logoStyling} size={20} />
        <BsPaypal className={logoStyling} size={20} />
        <BiLogoPatreon className={logoStyling} size={20} />
        <CgProfile className={logoStyling} size={20} />
      </div>
    </div>
  </footer>
);

export default Footer;
