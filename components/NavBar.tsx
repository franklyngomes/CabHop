import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="flex justify-between p-3 px-5  shadow-sm">
      <div className="flex justify-between gap-10 items-center">
        <Image
          src="/assets/cabhop-logo.png"
          width={100}
          height={100}
          alt="CabHop"
        />
        <ul className="hidden md:flex justify-between gap-5">
          <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Home
          </li>
          <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            History
          </li>
          <li className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Help
          </li>
        </ul>
      </div>
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
};

export default NavBar;
