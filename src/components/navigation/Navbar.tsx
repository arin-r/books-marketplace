"use client";

import { Fragment, useState } from "react";
import SideDrawer from "./SideDrawer";
import { Menu } from "lucide-react";
import UserInfoDropdown from "./UserInfoDropdown";
import { useSession } from "next-auth/react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchBar from "../SearchBar";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <Fragment>
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <SimpleCard />
        <SimpleCard />
        <SimpleCard />
      </SideDrawer>
      <nav className="bg-white opacity-100 px-6 fixed top-0 w-full z-10 border-b-gray-300 border-b-[1px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <Menu color="black" />
            </div>
            <SearchBar />
            {session?.user && <UserInfoDropdown session={session} />}
            {!session?.user && (
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({
                    variant: "outline",
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
