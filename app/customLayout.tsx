"use client";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import React, { ReactNode } from "react";

const CustomLayout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
      setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Image src="/assets/loader.gif" width={50} height={50} alt="Loader"/>
        </div>
      ) : (
        <>
          <NavBar />
          {children}
        </>
      )}
    </>
  );
};

export default CustomLayout;
