import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import SessionProviderWrapper from "@/app/providers/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "La Peritum Law Practice | Legal Experts in Nigeria",
  description:
  "La Peritum Law Practice provides expert legal and corporate advisory services in Nigeria, with specialisation in litigation, dispute resolution, and more.",
  keywords: [
    "La Peritum Law Practice",
    "Legal services Nigeria",
    "Corporate advisory Nigeria",
    "Litigation lawyers Nigeria",
    "Dispute resolution Nigeria",
    "Law firm Nigeria",
    "Business law Nigeria",
    "Contract law Nigeria",
    "Legal consultancy Nigeria",
    "Legal advice Nigeria",
  ].join(", "),
  authors: [
    { name: "La Peritum Law Practice", url: "https://www.laperitum.com" }
  ],
  creator: "La Peritum Law Practice",
  publisher: "La Peritum Law Practice",
  openGraph: {
    title: "La Peritum Law Practice – Expert Legal & Corporate Advisory Services",
    description:
      "Trusted legal experts offering business law, corporate advisory, and litigation services in Nigeria. Protect your interests with La Peritum Law Practice.",
    url: "https://www.laperitum.com",
    siteName: "La Peritum Law Practice",
    type: "website",
    images: [
      {
        url: "https://www.laperitum.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "La Peritum Law Practice Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Peritum Law Practice – Expert Legal & Corporate Advisory Services",
    description:
      "Professional legal and corporate advisory services for businesses and individuals across Nigeria. Contact La Peritum Law Practice today.",
    creator: "@LaPeritumLaw",
    images: ["https://www.laperitum.com/assets/og-image.png"],
  },
  alternates: {
    canonical: "https://www.laperitum.com",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className="scroll-smooth font-inter bg-white">
  <SessionProviderWrapper>
    <Navbar />
    {children}
    <Footer />
  </SessionProviderWrapper>
      </body>
    </html>
  );
}