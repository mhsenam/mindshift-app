"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-16 md:pb-0 md:pt-20">
        {children}
      </main>
      {isHomePage && <Footer />}
      <MobileNav />
    </>
  );
}
