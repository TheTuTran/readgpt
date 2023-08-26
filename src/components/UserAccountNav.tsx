"use client";

import { User } from "next-auth";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ExtendedUser extends User {
  theme?: string;
}

interface UserAccountNavProps {
  user: Pick<ExtendedUser, "name" | "image" | "email" | "theme">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${
          user.theme === "light" ? "" : "dark"
        } bg-background text-foreground`}
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p
                className={`${
                  user.theme === "light" ? "" : "dark"
                } w-[200px] truncate text-sm text-primary`}
              >
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/create/n">Create Novel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/create/c">Create Chapters</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(ev) => {
            ev.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/sign-in` });
          }}
          className="cursor-pointer"
        >
          <p>Sign Out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
