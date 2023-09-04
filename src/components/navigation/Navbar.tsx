"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC, Fragment, useState } from "react";
import { DollarSign, Home, Menu } from "lucide-react";

import UserInfoDropdown from "./UserInfoDropdown";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import SearchBar from "../SearchBar";
import SideDrawer from "./SideDrawer";

const SimpleCard = () => {
  return (
    <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded"></div>
            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SideDrawerItem = ({
  content,
  isActive,
  Icon,
}: {
  content: string;
  isActive: boolean;
  Icon: FC;
  // Icon: any
}) => {
  return (
    <div className="space-y-2">
      <Link
        href={content}
        className={cn(
          "flex items-center w-full justify-start hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md px-2 py-1 gap-2",
          {
            "bg-slate-50 dark:bg-slate-900": isActive,
          }
        )}
      >
        <Icon />
        <p className="flex">{content}</p>
      </Link>
    </div>
  );
};

/**
 * Contains all navigation
 * @returns
 */
const Navbar = ({ showSearchBar }: { showSearchBar: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <Fragment>
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <SideDrawerItem Icon={() => <Home />} isActive={true} content="shop" />
        <SideDrawerItem
          Icon={() => <DollarSign />}
          isActive={false}
          content="sell"
        />
      </SideDrawer>
      <nav className="bg-white dark:bg-stone-950 opacity-100 px-6 fixed top-0 w-full z-10 border-b-zinc-200 dark:border-b-zinc-800 border-b-[1px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <Menu className="dark:bg-black" />
            </div>
            {showSearchBar ? <SearchBar /> : null}
            {session?.user && <UserInfoDropdown session={session} />}
            {!session?.user && (
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  }),
                  "my-2"
                )}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
