import type { Metadata } from "next";
import FAQ from "./faq"; // Make sure you have an FAQ component in the same folder

export const metadata: Metadata = {
  title: "FAQ | La Peritum Law Practice",
  description:
    "Find answers to frequently asked questions about La Peritum Law Practice’s legal services, consultations, and client support.",
  alternates: {
    canonical: "https://laperitum.com/faq",
  },
};

export default function FAQPage() {
  return <FAQ />;
}