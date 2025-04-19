import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseCircleFill } from "react-icons/ri";

const NavBar = () => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  return (
    <>
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
        <div className="hidden md:block">
          <UserButton afterSwitchSessionUrl="/" />
        </div>
        <div className="flex items-center md:hidden ">
          <GiHamburgerMenu
            className="text-xl cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>
      <div
        className={`md:hidden fixed top-0 right-0 z-50 w-[70%] h-screen flex justify-between bg-gray-100 p-5 shadow-md transition-all duration-300 ease-in-out ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ overflow: "hidden!" }}
      >
        <div>
          <UserButton afterSwitchSessionUrl="/" />
          <Link href="/">
            <div className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all  mt-3">
              Home
            </div>
          </Link>
        </div>
        <RiCloseCircleFill
          onClick={() => setShowMenu(false)}
          className="cursor-pointer text-2xl "
        />
      </div>
    </>
  );
};

export default NavBar;
