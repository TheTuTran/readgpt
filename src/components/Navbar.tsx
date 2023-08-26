import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "../components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./Searchbar";
import ToggleTheme from "./ToggleTheme";
import { BiSolidBookAlt } from "react-icons/bi";
import { RiAiGenerate } from "react-icons/ri";
const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav
      className={` ${
        session?.user.theme === "light" ? "" : "dark"
      } fixed top-0 inset-x-0 h-fit bg-background text-foreground border-b border-zinc-300 z-[10] py-2`}
    >
      <section className="container max-w-7xl h-full mx-auto flex items-center gap-4">
        <Link href="/" className="flex gap-2 items-center ">
          <Icons.logo className="rounded-[50%] h-9 w-9 sm:h-7 sm:w-7" />
          <p className="hidden text-sm font-medium lg:block underline-animation">
            ReadGPT
          </p>
        </Link>

        <Link href="/novels" className="flex gap-2 items-center ">
          <BiSolidBookAlt className="h-9 w-9 sm:h-7 sm:w-7" />
          <p className="hidden text-sm font-medium lg:block underline-animation">
            Novels
          </p>
        </Link>

        <Link href="/generate" className="flex gap-2 items-center">
          <RiAiGenerate className="rounded-[50%] h-9 w-9 sm:h-7 sm:w-7" />
          <p className="hidden text-sm font-medium md:block underline-animation">
            Generate Stories
          </p>
        </Link>

        <SearchBar />
        <ToggleTheme theme={session?.user.theme} />

        {session ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({ className: "truncate" })}
          >
            Sign in
          </Link>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
