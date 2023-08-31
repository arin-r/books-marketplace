"use client"

import { Fragment, useState } from "react";
import SideDrawer from "./SideDrawer";
import { Menu } from "lucide-react";

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
  return (
    <Fragment>
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <SimpleCard />
        <SimpleCard />
        <SimpleCard />
        <SimpleCard />
        <SimpleCard />
      </SideDrawer>
      <nav className="bg-white opacity-100 py-4 px-6 fixed top-0 w-full z-10 border-b-gray-300 border-b-[1px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <Menu color="black" />
            </div>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
