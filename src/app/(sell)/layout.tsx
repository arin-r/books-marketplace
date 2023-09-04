import Navbar from "@/components/navigation/Navbar";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {children}
    </main>
  );
}
