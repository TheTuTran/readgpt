import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "../components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./Searchbar";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <main className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <section className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-9 w-9 sm:h-7 sm:w-7" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Echo
          </p>
        </Link>

        <SearchBar />

        {session ? (
          <>
            <UserAccountNav user={session.user} />
          </>
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </section>
    </main>
  );
};

export default Navbar;
