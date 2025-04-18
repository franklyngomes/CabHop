"use client";
import React, { useContext } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { AmountContext } from "@/context/AmountContext";

const Booking = () => {
  const { carAmount, setCarAmount } = useContext(AmountContext);
  const router = useRouter();

  return (
    <div className="p-3">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border border-gray-300 p-2 rounded-md h-full">
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <button
          className="w-full bg-yellow-400 p-1 rounded-md mt-4 cursor-pointer"
          onClick={() => router.push("/payment")}
          
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
