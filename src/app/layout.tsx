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
  authors: [{ name: "La Peritum Law Practice", url: "https://www.laperitum.com" }],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "La Peritum Law Practice",
              image: "https://www.laperitum.com/assets/logo.svg",
              description:
                "Expert legal and corporate advisory services in Nigeria specializing in litigation, dispute resolution, corporate governance, and fintech law.",
              url: "https://www.laperitum.com",
              telephone: "",
              address: {
                "@type": "PostalAddress",
                streetAddress: "",
                addressLocality: "Lagos",
                addressRegion: "Lagos",
                postalCode: "",
                addressCountry: "NG",
              },
              areaServed: ["NG"],
              priceRange: "$$",
              sameAs: [
                "https://www.facebook.com/LaPeritumLaw",
                "https://www.linkedin.com/company/laperitum-law-practice",
                "https://twitter.com/LaPeritumLaw",
              ],
            }),
          }}
        />
      </head>
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