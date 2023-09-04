import Navbar from "@/components/navigation/Navbar";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex">
      <Navbar showSearchBar={true}/>
      <div className="w-full">
        <div
          className={cn(
            "w-full space-y-4 md:p-8 p-4 pt-6 h-screen overflow-auto bg-slate-50 dark:bg-slate-950",
            {
              "h-[calc(100vh-4rem)]": false,
            }
          )}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
