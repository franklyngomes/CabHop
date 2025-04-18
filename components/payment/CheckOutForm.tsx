// components/payment/CheckOutForm.tsx
"use client";
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // optional, if you want redirect flow
      },
      redirect: "if_required", // allows Stripe to handle Apple Pay, etc.
    });

    if (error) {
      setErrorMessage(error.message ?? "Something went wrong");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      router.push('/success')
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl flex-1 flex-col justify-center items-center px-[15px]" style={{margin: "0 auto"}}>
      <h2 className="text-2xl my-3 font-semibold">Payment Methods</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {paymentSuccess ? (
          <p className="text-green-500">Payment successful!</p>
        ) : (
          <button type="submit" disabled={!stripe || loading} className="w-full bg-yellow-400 p-1 rounded-md mt-4 cursor-pointer font-semibold">
            {loading ? "Processing..." : "Continue"}
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
