import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!;

if(!stripeKey){
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables.")
}
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-03-31.basil',
})
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error : any) {
    console.error("❌ Stripe error:", error.message);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}