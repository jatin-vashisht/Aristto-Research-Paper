'use client'
import Link from "next/link";
import React from "react";
import GlobalSearch from "./GlobalSearch";
import { IoMdPaper } from "react-icons/io";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-4 justify-between items-center px-16 py-4 shadow-md md:flex-row">
      <div className="flex gap-2 items-center text-base md:text-2xl">
        <IoMdPaper />
        <Link href="/" className="font-semibold">Aristto</Link>
      </div>
      <div className="flex gap-6 text-sm md:text-base">
        <Link href="/" className={`hover:underline underline-offset-4 ${pathname === '/' && 'underline'}`}>
          Home
        </Link>
        <Link href="/saved" className={`hover:underline underline-offset-4 ${pathname === '/saved' && 'underline'}`}>
          Saved
        </Link>
      </div>
      <GlobalSearch />
    </div>
  );
};

export default Topbar;
