"use client";
import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/components/payment/CheckOutForm";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 3 }), // amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret)
    return (
      <div className="flex justify-center items-center mt-5">
        <Image src="/assets/loader.gif" width={50} height={50} alt="Loader" />
      </div>
    );

  const options = {
    clientSecret, // now guaranteed to be a string
    appearance: { theme: "stripe" as const },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm />
    </Elements>
  );
};

export default Payment;
