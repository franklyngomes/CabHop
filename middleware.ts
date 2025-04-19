import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:.*)|api/create-payment-intent).*)',
    '/(api|trpc)(?!/create-payment-intent).*', 
  ],
};