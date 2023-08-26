import { getAuthSession } from "@/lib/auth";
import { BiLogoPatreon } from "react-icons/bi";
import { BsDiscord, BsPaypal } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const logoStyling = "cursor-pointer";

const Footer = async () => {
  const session = await getAuthSession();
  return (
    <footer
      className={` ${
        session?.user.theme === "dark" ? "dark" : ""
      } w-full fixed z-40 bottom-0 mt-auto bg-background text-foreground border-zinc-300 border-t`}
    >
      <div className="py-6 mx-20 h-[60px] flex">
        <p>&copy; {new Date().getFullYear()}. ReadGPT</p>
        <div className="ml-auto items-center flex gap-6">
          <BsDiscord className={logoStyling} size={20} />
          <BsPaypal className={logoStyling} size={20} />
          <BiLogoPatreon className={logoStyling} size={20} />
          <CgProfile className={logoStyling} size={20} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
