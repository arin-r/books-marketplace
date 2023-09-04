import React, { Dispatch, FC, SetStateAction } from "react";

const SideDrawer = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <main
      className={
        "fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-all delay-500 opacity-0 -translate-x-full")
      }
    >
      <section
        className={
          "w-64 left-0 absolute bg-white dark:bg-stone-950 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <article
          className={
            "px-4 relative w-64 pb-10 flex flex-col gap-2 " +
            (isOpen ? "overflow-y-auto h-full" : "")
          }
        >
          <header className="p-4 font-bold text-lg">Books Marketplace</header>
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default SideDrawer;
