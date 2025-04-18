import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import CustomLayout from "./customLayout";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CabHop",
  description: "Get cabs lightning fast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <head></head>
        <body className={`${roboto.className} antialiased`}>
          <Toaster/>
          <CustomLayout>
            {children}
          </CustomLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
