// app/success/page.tsx
"use client";
import { CheckCircleIcon, PhoneIcon, CarIcon } from "lucide-react";
import React from "react";

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
             Booking Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Your ride has been successfully booked.
          </p>
          <div className="w-full text-left space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Driver:</span> John Doe
            </p>
            <p>
              <span className="font-semibold">Car:</span> Toyota Prius (Blue) — AB12 XYZ
            </p>
            <p>
              <span className="font-semibold">Arrival Time:</span> ~5 mins
            </p>
            <p>
              <span className="font-semibold">Pickup Location:</span> 123 Main Street
            </p>
            <p>
              <span className="font-semibold">Destination:</span> Central Mall
            </p>
            <p>
              <span className="font-semibold">📞 Driver Contact:</span> +1 234 567 8900
            </p>
            <p>
              <span className="font-semibold">💳 Payment:</span> Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
