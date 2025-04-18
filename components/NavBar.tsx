import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between p-3 px-5  shadow-sm">
      <div className="flex justify-between gap-10 items-center">
        <Image
          src="/assets/cabhop-logo.png"
          width={100}
          height={40}
          alt="CabHop"
          priority
           className="h-10 w-auto"
        />
        <ul className="hidden md:flex justify-between gap-5">
          <Link href="/">
          <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Home
          </li>
          </Link>
        </ul>
      </div>
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
};

export default NavBar;
