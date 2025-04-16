import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

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
        <body
          className={`${roboto.className} antialiased`}
        >
          <NavBar/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
